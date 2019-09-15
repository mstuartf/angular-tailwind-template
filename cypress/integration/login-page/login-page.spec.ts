import { LoginPage } from './login-page.model';

const page = new LoginPage();

describe('The Login Page', () => {

    describe('when navigating to the page without a token in local storage', () => {

        beforeEach(() => {
            page.setState({user: true});
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

        it('should redirect to home and not redirect back to login', () => {
            cy.server();
            cy.route('GET', `${page.serverUrl}/template`).as('template');
            page.open();
            cy.wait('@template').then((xhr) => {
                expect(xhr.status).to.equal(200);
                cy.url().should('include', '/templates');
            });
        });

    });

    describe('when logging in with valid credentials', () => {

        const emailAddress  = `test@${Math.floor(Math.random() * 100000)}.com`;
        const password = 'password';

        beforeEach(() => {
            page.setState({user: true, email: emailAddress, password, verified: true});
        });

        it('should redirect to home and save an access token in local storage', () => {
            cy.server();
            page.open();
            page.inputEmail(emailAddress);
            page.inputPassword(password);
            cy.route('POST', `${page.serverUrl}/auth`).as('auth');
            page.clickLogin();
            page.checkLoadingSpinner(true);
            cy.wait('@auth').then(() => {
                cy.url().should('include', '/templates').then(() => {
                    page.checkLoadingSpinner(false);
                    page.checkAccessToken(true);
                    page.checkAlertShowing(false);
                });
            });
        });

    });

    describe('when logging in with incorrect email address', () => {

        const emailAddress  = `test@${Math.floor(Math.random() * 100000)}.com`;
        const password = 'password';

        beforeEach(() => {
            page.setState({user: false, email: emailAddress, password});
        });

        it('should not redirect to home or save an access token in local storage', () => {
            cy.server();
            page.open();
            page.inputEmail(`__${emailAddress}`);
            page.inputPassword(password);
            cy.route('POST', `${page.serverUrl}/auth`).as('auth');
            page.clickLogin();
            page.checkLoadingSpinner(true);
            cy.wait('@auth').then(() => {
                cy.url().should('include', page.pageUrl).then(() => {
                    page.checkLoadingSpinner(false);
                    page.checkAccessToken(false);
                    page.checkAlertShowing(true);
                    page.closeAlertOK();
                    page.checkAlertShowing(false);
                });
            });
        });

    });

    describe('when logging in with incorrect password', () => {

        const emailAddress  = `test@${Math.floor(Math.random() * 100000)}.com`;
        const password = 'password';

        beforeEach(() => {
            page.setState({user: true, email: emailAddress, password, verified: true});
        });

        it('should not redirect to home or save an access token in local storage', () => {
            cy.server();
            page.open();
            page.inputEmail(emailAddress);
            page.inputPassword(`__${password}`);
            cy.route('POST', `${page.serverUrl}/auth`).as('auth');
            page.clickLogin();
            page.checkLoadingSpinner(true);
            cy.wait('@auth').then(() => {
                cy.url().should('include', page.pageUrl).then(() => {
                    page.checkLoadingSpinner(false);
                    page.checkAccessToken(false);
                    page.checkAlertShowing(true);
                    page.closeAlertOK();
                    page.checkAlertShowing(false);
                });
            });
        });

    });

    describe('when logging in before email address is verified', () => {

        const emailAddress  = `test@${Math.floor(Math.random() * 100000)}.com`;
        const password = 'password';

        beforeEach(() => {
            page.setState({user: true, email: emailAddress, password, verified: false});
        });

        it('should not redirect to home or save an access token in local storage', () => {
            cy.server();
            page.open();
            page.inputEmail(emailAddress);
            page.inputPassword(password);
            cy.route('POST', `${page.serverUrl}/auth`).as('auth');
            page.clickLogin();
            page.checkLoadingSpinner(true);
            cy.wait('@auth').then(() => {
                cy.url().should('include', page.pageUrl).then(() => {
                    page.checkLoadingSpinner(false);
                    page.checkAccessToken(false);
                    page.checkAlertShowing(true);
                    page.closeAlertOK();
                    page.checkAlertShowing(false);
                });
            });
        });

    });

    describe('when logging in with invalid credentials', () => {

        it('should disable the login button and show a warning if the user enters an invalid email address', () => {
            page.open();
            page.inputEmail('test');
            // focus on another element to show the warning
            page.inputPassword(' ');
            page.checkLoginButton(true);
            page.checkEmailWarning(true);
        });

        it('should disable the login button and show a warning if the user enters an invalid password', () => {
            page.open();
            page.inputPassword('pass');
            // focus on another element to show the warning
            page.inputEmail(' ');
            page.checkLoginButton(true);
            page.checkPasswordWarning(true);
        });

    });

    it('should redirect to the sign up page when the user clicks the sign up button', () => {
        page.open();
        page.clickSignUp();
        cy.url().should('include', '/sign-up');
    });

});
