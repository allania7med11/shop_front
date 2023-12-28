export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    username: string;
    email: string;
    password1: string;
    password2: string;
}


export interface IsUser {
    email: string;
    first_name: string;
    last_name: string;
}