import { IsUserProfile } from '@/data/auth';

export function getFullName(userProfile: IsUserProfile): string {
  if (!userProfile) {
    return 'Guest User';
  }
  const { first_name, last_name, email } = userProfile;
  const fullName = `${first_name} ${last_name}`.trim();
  return fullName || email.split('@')[0];
}

export function isAnonymous(userProfile: IsUserProfile | false): boolean {
  if (!userProfile || !userProfile.email) {
    return true;
  }
  return false;
}

export function getProfilePhoto(userProfile: IsUserProfile | false): string {
  if (isAnonymous(userProfile)) {
    return '/static/images/anonymous.png';
  }
  if (userProfile && !userProfile.profile_photo) {
    return '/static/images/user_authenticated.png';
  }
  return userProfile && userProfile.profile_photo;
}

export function getAdminProfile(): IsUserProfile {
  return {
    first_name: 'Logipsum',
    last_name: '',
    profile_photo: '/static/LogoSmall.svg',
    email: 'admin@logipsum.com',
    is_admin: true,
  };
}

export function getGuestProfile(): IsUserProfile {
  return {
    first_name: 'Guest',
    last_name: 'User',
    profile_photo: '/static/images/anonymous.png',
    email: '',
    is_admin: false,
  };
}

export function getCsrfToken() {
  let csrfToken = null;
  if (document.cookie) {
    const csrfCookies = document.cookie
      .split(';')
      .find(cookie => cookie.trim().startsWith('csrftoken='));
    if (csrfCookies) {
      csrfToken = csrfCookies.split('=')[1];
    }
  }
  return csrfToken;
}
