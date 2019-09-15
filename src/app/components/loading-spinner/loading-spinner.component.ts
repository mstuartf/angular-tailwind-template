import {Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {

  @Input()
  public fullScreen: boolean;

  @HostBinding('class')
  public get class(): string {
    return this.fullScreen ? 'fixed h-screen w-screen bg-white-1/2 flex items-center justify-center z-10' : '';
  }

}
