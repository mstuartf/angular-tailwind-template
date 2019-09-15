import { SignUpPage } from './sign-up-page.model';
import { SetStateResponse} from '../state.interface';

const page = new SignUpPage();

describe('The Sign Up Page', () => {

    describe('when navigating to the page without a token in local storage', () => {

        beforeEach(() => {
            page.setState();
        });

        it('should successfully load', () => {
            page.open();
            cy.url().should('include', page.pageUrl);
        });

    });

    describe('when navigating to the page with a token in local storage', () => {

        beforeEach(() => {
            page.setState({user: true, verified: true, token: true});
        });

        it('should redirect to templates', () => {
            page.open();
            cy.url().should('include', '/templates');
        });

    });

    describe('when signing up with valid details', () => {

        const emailAddress  = `test@${Math.floor(Math.random() * 100000)}.com`;

        beforeEach(() => {
            page.setState({user: false, email: emailAddress});
        });

        it('should redirect to verify email page then to login', () => {
            cy.server();
            page.open();
            page.inputEmail(emailAddress);
            page.inputPassword('password');
            page.inputName('E2E Test Company');
            page.inputSortCode('070246');
            page.inputAccountNumber('02949620');
            cy.route('POST', `${page.serverUrl}/sign-up`).as('signUp');
            page.clickSignUp();
            page.checkLoadingSpinner(true);
            cy.wait('@signUp').then(() => {
                cy.url().should('include', '/external/verify-email').then(() => {
                    page.checkLoadingSpinner(false);
                    page.checkAlertShowing(false);
                    cy.get('[data-cy=continueButton]').click();
                    cy.url().should('include', '/login');
                });
            });
        });

    });

    describe('when verifying the user\'s email address', () => {

        let code: string;
        const emailAddress  = `test@${Math.floor(Math.random() * 100000)}.com`;

        beforeEach(() => {
            page.setState({user: true, email: emailAddress, verified: false}).then((res: SetStateResponse) => {
                code = res.code;
            });
        });

        it('should show a confirmation page when the correct code is used', () => {
            cy.visit(`${page.serverUrl}/verify_email_address/${emailAddress}/${code}`).then(() => {
                cy.get('[data-cy=email-verified-header]').should('exist');
            });
        });

        it('should show an error page when an incorrect code is used', () => {
            cy.visit(`${page.serverUrl}/verify_email_address/${emailAddress}/INCORRECT_CODE`).then(() => {
                cy.get('[data-cy=email-not-verified-header]').should('exist');
            });
        });

    });

    describe('when signing up with taken details', () => {

        const emailAddress  = `test@${Math.floor(Math.random() * 100000)}.com`;

        beforeEach(() => {
            page.setState({user: true, email: emailAddress});
        });

        it('should not redirect to verify email when the user inputs a taken email address', () => {
            cy.server();
            page.open();
            page.inputEmail(emailAddress);
            page.inputPassword('password');
            page.inputName('E2E Test Company');
            page.inputSortCode('070246');
            page.inputAccountNumber('02949620');
            cy.route('POST', `${page.serverUrl}/sign-up`).as('signUp');
            page.clickSignUp();
            page.checkLoadingSpinner(true);
            cy.wait('@signUp').then(() => {
                cy.url().should('include', page.pageUrl).then(() => {
                    page.checkLoadingSpinner(false);
                    page.checkAlertShowing(true);
                    page.closeAlertOK();
                    page.checkAlertShowing(false);
                });
            });
        });

    });

    describe('when signing up with invalid details', () => {

        it('should disable the sign up button and show a warning if the user enters an invalid email address', () => {
            page.open();
            page.inputEmail('test');
            // focus on another element to show the warning
            page.inputPassword(' ');
            page.checkSignUpButton(true);
            page.checkEmailWarning(true);
        });

        it('should disable the sign up button and show a warning if the user enters an invalid password', () => {
            page.open();
            page.inputPassword('pass');
            // focus on another element to show the warning
            page.inputEmail(' ');
            page.checkSignUpButton(true);
            page.checkPasswordWarning(true);
        });

        it('should disable the sign up button and show a warning if the user enters an invalid name', () => {
            page.open();
            page.inputName(' ');
            // focus on another element to show the warning
            page.inputEmail(' ');
            page.checkSignUpButton(true);
            page.checkNameWarning(true);
        });

        it('should disable the sign up button and show a warning if the user enters an invalid sort code', () => {
            page.open();
            page.inputSortCode('07');
            // focus on another element to show the warning
            page.inputEmail(' ');
            page.checkSignUpButton(true);
            page.checkSortCodeWarning(true);
        });

        it('should disable the sign up button and show a warning if the user enters an invalid account number', () => {
            page.open();
            page.inputAccountNumber('029');
            // focus on another element to show the warning
            page.inputEmail(' ');
            page.checkSignUpButton(true);
            page.checkAccountNumberWarning(true);
        });

    });

    it('should redirect to the login page when the user clicks the back button', () => {
        page.open();
        page.clickBack();
        cy.url().should('include', '/login');
    });

});
