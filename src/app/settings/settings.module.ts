import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SettingsPage } from './settings.page';


const routes: Routes = [
    {
        path: '', component: SettingsPage,
        children: [
            {path: '', redirectTo: 'settings', pathMatch: 'full'}
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [SettingsPage]
})
export class SettingsPageModule {
}
