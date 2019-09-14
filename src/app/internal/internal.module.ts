import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { InternalPage } from './internal.page';
import { InternalGuard } from './internal.guard';


const routes: Routes = [
    {
        path: '', component: InternalPage, canActivate: [InternalGuard],
        children: [
            {path: 'home', loadChildren: '../home/home.module#HomePageModule'},
            {path: 'settings', loadChildren: '../settings/settings.module#SettingsPageModule'},
            {path: '', redirectTo: 'home', pathMatch: 'full'}
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [InternalPage]
})
export class InternalPageModule {
}
