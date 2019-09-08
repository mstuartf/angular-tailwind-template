import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';


import { ExternalPage } from './external.page';
import { ExternalGuard } from './external.guard';


const routes: Routes = [
    {
        path: '', component: ExternalPage, canActivate: [ExternalGuard],
        children: [
            {path: 'login', loadChildren: '../login/login.module#LoginPageModule'},
            {path: 'sign-up', loadChildren: '../sign-up/sign-up.module#SignUpPageModule'},
            {path: 'verify-email', loadChildren: '../verify-email/verify-email.module#VerifyEmailPageModule'},
            {path: '', redirectTo: 'login', pathMatch: 'full'}
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [ExternalPage]
})
export class ExternalPageModule {
}
