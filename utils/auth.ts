import { IsUserProfile } from '@/data/auth';

export function getFullName(userProfile: IsUserProfile): string {
  if (!userProfile) {
    return;
  }
  const { first_name, last_name, email } = userProfile;
  const fullName = `${first_name} ${last_name}`.trim();
  return fullName || email.split('@')[0];
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
