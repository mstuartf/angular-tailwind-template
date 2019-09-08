import {AppPageModel} from '../app-page.model';

export class SignUpPage extends AppPageModel {

    constructor() {
        super('/external/sign-up', 'sign-up-error-alert');
    }

    public inputEmail(emailAddress: string): void {
        this.inputIonInput('[data-cy=emailAddressInput]', emailAddress);
    }

    public inputPassword(password: string): void {
        this.inputIonInput('[data-cy=passwordInput]', password);
    }

    public inputName(name: string): void {
        this.inputIonInput('[data-cy=nameInput]', name);
    }

    public inputSortCode(sortCode: string): void {
        this.inputIonInput('[data-cy=sortCodeInput]', sortCode);

    }

    public inputAccountNumber(accountNumber: string): void {
        this.inputIonInput('[data-cy=accountNumberInput]', accountNumber);

    }

    public clickBack(): void {
        cy.get('[data-cy=backButton]').click();
    }

    public clickSignUp(): void {
        cy.get('[data-cy=signUpButton]').click();
    }

    public checkSignUpButton(disabled: boolean): void {
        this.checkIonButtonDisabled('[data-cy=signUpButton]', disabled);
    }

    public checkEmailWarning(isShowing: boolean): void {
        this.checkElementExists('[data-cy=emailWarning]', isShowing);
    }

    public checkPasswordWarning(isShowing: boolean): void {
        this.checkElementExists('[data-cy=passwordWarning]', isShowing);
    }

    public checkNameWarning(isShowing: boolean): void {
        this.checkElementExists('[data-cy=nameWarning]', isShowing);
    }

    public checkSortCodeWarning(isShowing: boolean): void {
        this.checkElementExists('[data-cy=sortCodeWarning]', isShowing);
    }

    public checkAccountNumberWarning(isShowing: boolean): void {
        this.checkElementExists('[data-cy=accountNumberWarning]', isShowing);
    }

}
