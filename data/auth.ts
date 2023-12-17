export interface LoginCredentials {
    username: string;
    password: string;
}

export interface AuthCredentials {
    access: string;
    refresh: string;
}

export interface IsUser {
    email: string;
    first_name: string;
    last_name: string;
}