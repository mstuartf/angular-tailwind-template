import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { UserService } from './user.service';
import * as UserActions from './user.actions';
import { UserResponse, UserToken } from './user.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';

@Injectable()
export class UserEffects {

    constructor(public actions$: Actions, public userService: UserService, private store$: Store<AppState>) {
    }

    @Effect()
    private register$ = this.actions$.pipe(
        ofType(UserActions.SIGN_UP_REQUEST),

        switchMap((action: UserActions.SignUpRequest) =>
            this.userService.signUp(action.payload).pipe(
                map(() => new UserActions.SignUpSuccess()),
                // need to catch the error or the stream will end
                catchError((err: HttpErrorResponse) => of(new UserActions.SignUpFailure(err)))
            )
        )
    );

    @Effect()
    private login$ = this.actions$.pipe(
        ofType(UserActions.LOGIN_REQUEST),

        switchMap((action: UserActions.LoginRequest) =>
            this.userService.login(action.payload).pipe(
                map((data: UserToken) => {
                    this.userService.setToken(data.access_token);
                    return new UserActions.LoginSuccess();
                }),
                // need to catch the error or the stream will end
                catchError((err: HttpErrorResponse) => of(new UserActions.LoginFailure(err)))
            )
        )
    );

    @Effect()
    private logout$ = this.actions$.pipe(
        ofType(UserActions.LOGOUT_REQUEST),

        switchMap((action: UserActions.LogoutRequest) =>
            this.userService.logout().pipe(
                map(() => {
                    this.userService.removeToken();
                    return new UserActions.LogoutSuccess();
                }),
                // need to catch the error or the stream will end
                catchError((err: HttpErrorResponse) => of(new UserActions.LogoutFailure(err)))
            )
        )
    );

    @Effect()
    private get$ = this.actions$.pipe(
        ofType(UserActions.GET_USER_REQUEST),
        withLatestFrom(this.store$.select<UserResponse>('user')),
        switchMap(([action, user]: [UserActions.GetUserRequest, UserResponse]) => {
            if (user) {
                return of(new UserActions.UseCachedUser());
            } else {
                return this.userService.getMyself().pipe(
                    map((data: UserResponse) => new UserActions.GetUserSuccess(data)),
                    // need to catch the error or the stream will end
                    catchError((err: HttpErrorResponse) => of(new UserActions.GetUserFailure(err)))
                );
            }
        })
    );

}
