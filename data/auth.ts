export interface LoginCredentials {
    username: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}

export interface IsUser {
    email: string;
    first_name: string;
    last_name: string;
}