import { environment } from '../../src/environments/environment';
import { SetStatePayload, SetStateResponse } from './state.interface';

export class PageModel {

    public serverUrl = environment.baseUrl;

    public setState(args: SetStatePayload = {}) {

        cy.clearLocalStorage();

        if (!args.user && args.token) {
            throw new Error('Cannot save token to local storage if test user does not exist.');
        }

        if (!args.user && args.templates) {
            throw new Error('Cannot create templates if test user does not exist.');
        }

        return new Cypress.Promise((resolve: any) => {
            cy.request('PUT', `${this.serverUrl}/e2e/set_state`, args).then((res: {body: SetStateResponse}) => {
                if (args.token) {
                    localStorage.setItem(environment.tokenKey, JSON.stringify(res.body.token));
                }
                resolve(res.body);
            });
        });

    }

}
