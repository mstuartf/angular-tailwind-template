import {HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserResponse} from '../providers/user/user.interface';

export type MockBackendHandlerFunction = (request: HttpRequest<{}>) => Observable<HttpResponse<{}>>;

export interface MockBackendHandlers {
    [url: string]: {
        GET?: MockBackendHandlerFunction,
        put?: MockBackendHandlerFunction,
        POST?: MockBackendHandlerFunction,
        patch?: MockBackendHandlerFunction,
        delete?: MockBackendHandlerFunction
    }
}

export interface MockBackendDatabase {
    user: UserResponse[];
}
