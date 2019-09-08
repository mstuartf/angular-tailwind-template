import { HttpErrorResponse } from '@angular/common/http';

import { StoreAction } from '../../state/store-action.interface';

import { UserResponse, LoginPayload, SignUpPayload } from './user.interface';

// SIGN_UP NEW USERS -----------------------------------

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';

export class SignUpRequest implements StoreAction {
    readonly type = SIGN_UP_REQUEST;

    constructor(public payload: SignUpPayload) {
    }
}

export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';

export class SignUpSuccess implements StoreAction {
    readonly type = SIGN_UP_SUCCESS;

    constructor() {
    }
}

export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export class SignUpFailure implements StoreAction {
    readonly type = SIGN_UP_FAILURE;

    constructor(public payload: HttpErrorResponse) {
    }
}

// LOGIN EXISTING USERS --------------------------------

export const LOGIN_REQUEST = 'LOGIN_REQUEST';

export class LoginRequest implements StoreAction {
    readonly type = LOGIN_REQUEST;

    constructor(public payload: LoginPayload) {
    }
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export class LoginSuccess implements StoreAction {
    readonly type = LOGIN_SUCCESS;
}

export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export class LoginFailure implements StoreAction {
    readonly type = LOGIN_FAILURE;

    constructor(public payload: HttpErrorResponse) {
    }
}

// LOGOUT ----------------------------------------------

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';

export class LogoutRequest implements StoreAction {
    readonly type = LOGOUT_REQUEST;

    constructor() {
    }
}

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export class LogoutSuccess implements StoreAction {
    readonly type = LOGOUT_SUCCESS;

    constructor() {
    }
}

export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export class LogoutFailure implements StoreAction {
    readonly type = LOGOUT_FAILURE;

    constructor(public payload: HttpErrorResponse) {
    }
}

// GET ----------------------------------------------

export const GET_USER_REQUEST = 'GET_USER_REQUEST';

export class GetUserRequest implements StoreAction {
    readonly type = GET_USER_REQUEST;

    constructor() {
    }
}

export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';

export class GetUserSuccess implements StoreAction {
    readonly type = GET_USER_SUCCESS;

    constructor(public payload: UserResponse) {
    }
}

export const GET_USER_FAILURE = 'GET_USER_FAILURE';

export class GetUserFailure implements StoreAction {
    readonly type = GET_USER_FAILURE;

    constructor(public payload: HttpErrorResponse) {
    }
}

export const USE_CACHED_USER = 'USE_CACHED_USER';

export class UseCachedUser implements StoreAction {
    readonly type = USE_CACHED_USER;

    constructor() {
    }
}

export type Actions =
    GetUserRequest
    | GetUserSuccess
    | GetUserFailure
    | SignUpRequest
    | SignUpSuccess
    | LoginRequest
    | LoginSuccess
    | LogoutRequest
    | LogoutSuccess
    | UseCachedUser;
