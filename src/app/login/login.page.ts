import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {LoginPayload} from '../../providers/user/user.interface';
import {Store} from '@ngrx/store';
import {AppState} from '../../state/app.state';
import * as UserActions from '../../providers/user/user.actions';
import {Actions} from '@ngrx/effects';
import {takeUntil} from 'rxjs/operators';
import {StoreAction} from '../../state/store-action.interface';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {AlertModalConfig} from '../components/alert-modal/alert-modal.component';
import {CustomErrorResponse} from '../../providers/api/api.interface';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

    public loginForm: FormGroup;
    public showLoading: boolean;
    public alertConfig: AlertModalConfig;
    private unsubscribe = new Subject();

    constructor(
        private router: Router,
        private actions$: Actions,
        private store: Store<AppState>
    ) {
    }

    public ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    public ngOnInit(): void {

        this.loginForm = new FormGroup({
            emailAddress: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(8)])
        });

        this.actions$.pipe(takeUntil(this.unsubscribe)).subscribe((action: StoreAction) => {

            switch (action.type) {

                case UserActions.LOGIN_SUCCESS:
                    this.loginSuccess();
                    break;

                case UserActions.LOGIN_FAILURE:
                    this.loginFailure(action.payload);
                    break;

                default:
                    break;

            }

        });
    }

    public login(): void {
        this.showLoading = true;
        const payload: LoginPayload = {
            email_address: this.loginForm.controls.emailAddress.value,
            password: this.loginForm.controls.password.value
        };
        this.store.dispatch(new UserActions.LoginRequest(payload));
    }

    private loginSuccess(): void {
        this.router.navigate(['/internal/home'], {replaceUrl: true});
        this.showLoading = false;
    }

    private loginFailure(response: CustomErrorResponse): void {
        this.showLoading = false;
        this.alertConfig = {
            header: response.error.header,
            message: response.error.message,
            confirm: 'ok'
        };
    }

    public errorAlertCallback(): void {
        this.alertConfig = null;
    }

}
