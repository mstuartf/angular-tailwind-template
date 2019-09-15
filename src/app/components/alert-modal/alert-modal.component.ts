import {Component, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';
import {AlertModalConfig} from './alert-modal.interface';

@Component({
    selector: 'app-alert-modal',
    templateUrl: './alert-modal.component.html',
    styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent {

    @Input() config: AlertModalConfig;
    @Output() result: EventEmitter<boolean> = new EventEmitter<boolean>();

    // close the modal when the user clicks on the overlay
    @HostListener('click', ['$event'])
    public handleClickEvent(event: MouseEvent) {
        const target = event.target as HTMLElement;
        if (target.id === this.id) {
            this.clicked(false);
        }
    }

    // close the modal when the user presses escape
    @HostListener('document:keydown.escape')
    public onKeydownHandler() {
        this.clicked(false);
    }

    // add an ID to the overlay so we can tell when it has been clicked in the host listener
    @HostBinding('id') id = 'alert-modal-overlay';

    @HostBinding('class')
    public get class(): string {
        return this.config ? 'fixed h-screen w-screen bg-white-1/2 flex items-center justify-center z-10 px-2' : 'hidden';
    }

    public clicked(value: boolean): void {
        this.result.emit(value);
    }

}
