import {HttpErrorResponse, HttpRequest, HttpResponse} from '@angular/common/http';
import {of, throwError} from 'rxjs';

import {database} from './mock-backend.database';
import {MockBackendHandlers} from './mock-backend.interface';
import {UserResponse} from '../providers/user/user.interface';

const getToken = (request: HttpRequest<any>) => request.headers.get('Authorization').replace('Bearer ', '');

export const handlers: MockBackendHandlers = {
    '/auth': {
        POST: (request: HttpRequest<any>) => {
            const user: UserResponse = database.user.find(u => u.email_address === request.body.email_address);
            if (!user) {
                return throwError(new HttpErrorResponse({
                    error: {
                        header: 'Error',
                        message: 'Invalid email address or password.'
                    },
                    status: 400
                }));
            }
            return of(new HttpResponse({
                status: 201,
                body: {access_token: user.id}
            }));
        }
    },
    '/user/current-user': {
        GET: (request: HttpRequest<any>) => {
            const user: UserResponse = database.user.find(u => u.id.toString() === getToken(request));
            if (!user) {
                return throwError(new HttpErrorResponse({status: 401}));
            }

            return of(new HttpResponse({
                status: 201,
                body: user
            }));
        }
    },
    '/sign-up': {
        POST: (request: HttpRequest<any>) => {
            const user: UserResponse = {
                email_address: request.body.email_address,
                name: request.body.name,
                id: Math.floor(Math.random() * (1000))
            };
            database.user.push(user);
            return of(new HttpResponse({
                status: 201,
                body: null
            }));
        }
    },

};
