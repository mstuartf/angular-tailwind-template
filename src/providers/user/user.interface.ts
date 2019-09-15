export interface UserResponse {
    id: number;
    email_address: string;
    name: string;
}

export interface LoginPayload {
    email_address: string;
    password: string;
}

export interface UserToken {
    access_token: string;
}

export interface SignUpPayload {
    email_address: string;
    password: string;
}

