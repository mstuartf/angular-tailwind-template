import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginPayload } from '../../providers/user/user.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import * as UserActions from '../../providers/user/user.actions';
import { Actions } from '@ngrx/effects';
import { takeUntil } from 'rxjs/operators';
import { StoreAction } from '../../state/store-action.interface';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

    public loginForm: FormGroup;
    private unsubscribe = new Subject();

    constructor(
        private router: Router,
        private actions$: Actions,
        private store: Store<AppState>,
        // private loadingCtrl: LoadingController,
        // private alertController: AlertController
    ) {}

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
        // this.presentLoading('Logging in').then(() => {
            const payload: LoginPayload = {
                email_address: this.loginForm.controls.emailAddress.value,
                password: this.loginForm.controls.password.value
            };
            this.store.dispatch(new UserActions.LoginRequest(payload));
        // });
    }

    private loginSuccess(): void {
        // this.loadingCtrl.dismiss();
        // this.loginForm.reset();
        // pass replaceUrl so that the login component is destroyed after navigating home
        this.router.navigate(['/internal/home'], {replaceUrl: true});
    }

    private loginFailure(response: HttpErrorResponse): void {
        // this.loadingCtrl.dismiss();
        // this.presentAlert(response.error);
    }

    // private async presentLoading(message: string): Promise<void> {
    //     const loadingElement = await this.loadingCtrl.create({message: message, spinner: 'crescent', cssClass: 'cy-loading-spinner'});
    //     return await loadingElement.present();
    // }

    // private async presentAlert(error: { header: string, message: string }): Promise<void> {
    //     const alert = await this.alertController.create({
    //         header: error.header,
    //         message: error.message,
    //         buttons: [{text: 'OK', cssClass: 'login-error-alert-ok'}],
    //         cssClass: 'login-error-alert'
    //     });
    //     await alert.present();
    // }

}
