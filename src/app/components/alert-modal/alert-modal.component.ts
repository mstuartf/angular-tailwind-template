import {Component, HostBinding, Input, Output, EventEmitter} from '@angular/core';

export interface AlertModalConfig {
  header: string;
  message: string;
  confirm: string;
  cancel?: string;
}

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent {

  @Input() config: AlertModalConfig;
  @Output() click: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostBinding('class')
  public get class(): string {
    return this.config ? 'fixed h-screen w-screen bg-white-1/2 flex items-center justify-center z-10 px-2' : 'hidden';
  }

  public clicked(value: boolean): void {
    this.click.emit(value);
  }

}
