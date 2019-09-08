import { environment } from '../../src/environments/environment';
import { PageModel } from './page.model';

export class AppPageModel extends PageModel {

    public pageUrl: string;
    public alertCSSClass?: string;

    constructor(pageUrl: string, alertCSSClass?: string) {
        super();
        this.pageUrl = pageUrl;
        this.alertCSSClass = alertCSSClass;
    }

    public open(): void {
        cy.visit(this.pageUrl);
    }

    public setResolution() {
        cy.viewport('iphone-6');
    }

    public checkAccessToken(shouldExist: boolean): void {
        if (shouldExist) {
            expect(localStorage.getItem(environment.tokenKey)).to.exist;
        } else {
            expect(localStorage.getItem(environment.tokenKey)).to.be.null;
        }
    }

    public checkLoadingSpinner(shouldExist: boolean): void {
        const status = shouldExist ? 'exist' : 'not.exist';
        cy.get('.cy-loading-spinner').should(status);
    }

    // helper method as ion-elements have nesting
    public inputIonInput(identifier: string, value: string): void {
        cy.get(identifier).children().type(value);
    }

    public closeAlertOK(): void {
        cy.get(`.${this.alertCSSClass}-ok`).click();
    }

    public closeAlertCancel(): void {
        cy.get(`.${this.alertCSSClass}-cancel`).click();
    }

    public checkAlertShowing(isShowing: boolean): void {
        const status = isShowing ? 'exist' : 'not.exist';
        cy.get(`.${this.alertCSSClass}`).should(status);
    }

    // need to check disabled status of Ion buttons using class
    public checkIonButtonDisabled(identifier: string, disabled: boolean): void {
        const status = disabled ? 'have.class' : 'not.have.class';
        cy.get(identifier).should(status, 'button-disabled');
    }

    public checkElementExists(identifier: string, isShowing: boolean): void {
        const status = isShowing ? 'exist' : 'not.exist';
        cy.get(identifier).should(status);
    }

}
