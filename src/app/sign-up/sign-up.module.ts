import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {SignUpPage} from './sign-up-page.component';
import {LoadingSpinnerModule} from '../components/loading-spinner/loading-spinner.module';
import {AlertModalModule} from '../components/alert-modal/alert-modal.module';

const routes: Routes = [
    {
        path: '',
        component: SignUpPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AlertModalModule,
        LoadingSpinnerModule,
        RouterModule.forChild(routes)
    ],
    declarations: [SignUpPage]
})
export class SignUpPageModule {
}
