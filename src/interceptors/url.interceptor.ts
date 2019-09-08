import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable()
export class UrlInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            url: environment.baseUrl + request.url
        });

        return next.handle(request);

    }

}

export let UrlProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: UrlInterceptor,
    multi: true
};
