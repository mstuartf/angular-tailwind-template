import { NgModule } from '@angular/core';
import { AlertModalComponent } from './alert-modal.component';
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [AlertModalComponent],
    exports: [AlertModalComponent],
    entryComponents: [AlertModalComponent],
    imports: [
        CommonModule
    ]
})
export class AlertModalModule {
}
