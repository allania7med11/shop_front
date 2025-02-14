export interface IsUserProfile {
  first_name: string;
  last_name: string;
  email: string;
  profile_photo: string;
}

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

export interface ConfirmResetPasswordCredentials {
  uid: string;
  token: string;
  new_password1: string;
  new_password2: string;
}
