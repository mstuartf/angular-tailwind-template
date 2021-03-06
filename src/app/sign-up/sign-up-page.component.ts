import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SignUpPayload} from '../../providers/user/user.interface';
import {Store} from '@ngrx/store';
import {AppState} from '../../state/app.state';
import {Actions} from '@ngrx/effects';
import {takeUntil} from 'rxjs/operators';
import {StoreAction} from '../../state/store-action.interface';
import * as UserActions from '../../providers/user/user.actions';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {CustomErrorResponse} from '../../providers/api/api.interface';
import {AlertModalConfig} from "../components/alert-modal/alert-modal.interface";

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up-page.component.html',
    styleUrls: ['./sign-up-page.component.scss'],
})
export class SignUpPage implements OnInit {

    constructor(
        private router: Router,
        private actions$: Actions,
        private store: Store<AppState>
    ) {}

    public signUpForm: FormGroup;
    public showLoading: boolean;
    public alertConfig: AlertModalConfig;
    private unsubscribe = new Subject();

    public ngOnInit(): void {

        this.signUpForm = new FormGroup({
            emailAddress: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(8)])
        });

        this.actions$.pipe(takeUntil(this.unsubscribe)).subscribe((action: StoreAction) => {

            switch (action.type) {

                case UserActions.SIGN_UP_SUCCESS:
                    this.signUpSuccess();
                    break;

                case UserActions.SIGN_UP_FAILURE:
                    this.signUpFailure(action.payload);
                    break;

                default:
                    break;

            }

        });
    }

    public signUp(): void {
        this.showLoading = true;
        const payload: SignUpPayload = {
            email_address: this.signUpForm.controls.emailAddress.value,
            password: this.signUpForm.controls.password.value
        };
        this.store.dispatch(new UserActions.SignUpRequest(payload));
    }

    private signUpSuccess(): void {
        // pass replaceUrl so that the sign-up component is destroyed after the verification message
        this.router.navigate(['/external/verify-email'], {replaceUrl: true});
        this.showLoading = false;
    }

    private signUpFailure(response: CustomErrorResponse): void {
        this.showLoading = false;
        this.alertConfig = {
            header: response.error.header,
            message: response.error.message,
            confirm: 'OK'
        };
    }

    public errorAlertCallback(): void {
        this.alertConfig = null;
    }

}
