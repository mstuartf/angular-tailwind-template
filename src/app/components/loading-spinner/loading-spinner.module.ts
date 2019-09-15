import { NgModule } from '@angular/core';
import { LoadingSpinnerComponent } from './loading-spinner.component';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [LoadingSpinnerComponent],
    exports: [LoadingSpinnerComponent],
    entryComponents: [LoadingSpinnerComponent],
    imports: [
        CommonModule
    ]
})
export class LoadingSpinnerModule {
}
