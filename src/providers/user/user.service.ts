import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserResponse, LoginPayload, UserToken, SignUpPayload } from './user.interface';
import { ApiService } from '../api/api.service';
import { tap, delay } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

    constructor(private apiService: ApiService) {
    }

    public setToken(token: string): void {
        localStorage.setItem(environment.tokenKey, JSON.stringify(token));
    }

    public getToken(): string {
        console.log(localStorage.getItem(environment.tokenKey));
        return JSON.parse(localStorage.getItem(environment.tokenKey));
    }

    public removeToken(): void {
        localStorage.removeItem(environment.tokenKey);
    }

    login(payload: LoginPayload): Observable<UserToken> {
        return this.apiService.post<UserToken>('/auth', payload).pipe(
            tap((userToken: UserToken) => this.setToken(userToken.access_token))
        );
    }

    getMyself(): Observable<UserResponse> {
        return this.apiService.get<UserResponse>('/user/current-user');
    }

    logout(): Observable<void> {
        return of(this.removeToken()).pipe(delay(500));
    }

    signUp(payload: SignUpPayload): Observable<UserResponse> {
        return this.apiService.post<UserResponse>('/sign-up', payload);
    }

}
