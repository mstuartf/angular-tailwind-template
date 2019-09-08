import {
    HTTP_INTERCEPTORS,
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

import {UserService} from '../providers/user/user.service';
import {Router} from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(
        private userService: UserService, private router: Router
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = this.userService.getToken();

        if (token) {
            request = this.setAuthHeader(request, token);
        }

        return next.handle(request).pipe(
            tap(
                (event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        // option to modify successful requests here
                        // console.log('success', event);
                    }
                },

                (err: HttpErrorResponse) => {
                    if (err.status === 401) {
                        this.userService.removeToken();
                        this.router.navigate(['external/login']);
                    }
                }
            )
        );

    }

    setAuthHeader(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                Authorization: `JWT ${token}`
            }
        });
    }

}

export let TokenProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
};
