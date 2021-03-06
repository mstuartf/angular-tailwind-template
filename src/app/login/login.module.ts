import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';


import {LoginPage} from './login.page';
import {LoadingSpinnerModule} from '../components/loading-spinner/loading-spinner.module';
import {AlertModalModule} from '../components/alert-modal/alert-modal.module';

const routes: Routes = [
    {
        path: '',
        component: LoginPage
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
    declarations: [LoginPage]
})
export class LoginPageModule {
}
