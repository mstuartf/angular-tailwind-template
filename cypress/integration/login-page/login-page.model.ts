import {AppPageModel} from '../app-page.model';

export class LoginPage extends AppPageModel {

    constructor() {
        super('/external/login', 'login-error-alert');
    }

    public inputEmail(emailAddress: string): void {
        this.inputIonInput('[data-cy=emailAddressInput]', emailAddress);
    }

    public inputPassword(password: string): void {
        this.inputIonInput('[data-cy=passwordInput]', password);
    }

    public clickLogin(): void {
        cy.get('[data-cy=loginButton]').click();
    }

    public clickSignUp(): void {
        cy.get('[data-cy=signUpButton]').click();
    }

    public checkLoginButton(disabled: boolean): void {
        this.checkIonButtonDisabled('[data-cy=loginButton]', disabled);
    }

    public checkEmailWarning(isShowing: boolean): void {
        this.checkElementExists('[data-cy=emailWarning]', isShowing);
    }

    public checkPasswordWarning(isShowing: boolean): void {
        this.checkElementExists('[data-cy=passwordWarning]', isShowing);
    }

}
