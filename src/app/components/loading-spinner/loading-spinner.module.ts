import { NgModule } from '@angular/core';
import { LoadingSpinnerComponent } from './loading-spinner.component';

@NgModule({
    declarations: [LoadingSpinnerComponent],
    exports: [LoadingSpinnerComponent],
    entryComponents: [LoadingSpinnerComponent],
})
export class LoadingSpinnerModule {
}
