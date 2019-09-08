import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignUpPayload } from '../../providers/user/user.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { Actions } from '@ngrx/effects';
import { takeUntil } from 'rxjs/operators';
import { StoreAction } from '../../state/store-action.interface';
import * as UserActions from '../../providers/user/user.actions';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up-page.component.html',
    styleUrls: ['./sign-up-page.component.scss'],
})
export class SignUpPage implements OnInit {

    constructor(
        private router: Router,
        private actions$: Actions,
        private store: Store<AppState>,
        // private loadingCtrl: LoadingController,
        // private alertController: AlertController
    ) {}

    public signUpForm: FormGroup;
    private unsubscribe = new Subject();

    private static noSpacesOnlyValidator(control: FormControl) {
        const isWhitespace = (control.value || '').trim().length === 0;
        return isWhitespace ? { whitespace: true } : null;
    }

    public ngOnInit(): void {

        this.signUpForm = new FormGroup({
            emailAddress: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(8)]),
            name: new FormControl('', [Validators.required, SignUpPage.noSpacesOnlyValidator])
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
        // this.presentLoading('Signing up').then(() => {
            const payload: SignUpPayload = {
                email_address: this.signUpForm.controls.emailAddress.value,
                password: this.signUpForm.controls.password.value,
                name: this.signUpForm.controls.name.value
            };
            this.store.dispatch(new UserActions.SignUpRequest(payload));
        // });
    }

    private signUpSuccess(): void {
        // this.loadingCtrl.dismiss();
        // pass replaceUrl so that the sign-up component is destroyed after the verification message
        this.router.navigate(['/external/verify-email'], {replaceUrl: true});
    }

    private signUpFailure(response: HttpErrorResponse): void {
        // this.loadingCtrl.dismiss();
        // this.presentAlert(response.error);
    }

    // private async presentLoading(message: string): Promise<void> {
    //     const loadingElement = await this.loadingCtrl.create({message, spinner: 'crescent', cssClass: 'cy-loading-spinner'});
    //     return await loadingElement.present();
    // }

    // private async presentAlert(error: { header: string, message: string }): Promise<void> {
    //     const alert = await this.alertController.create({
    //         header: error.header,
    //         message: error.message,
    //         buttons: [{text: 'OK', cssClass: 'sign-up-error-alert-ok'}],
    //         cssClass: 'sign-up-error-alert'
    //     });
    //     await alert.present();
    // }

}
