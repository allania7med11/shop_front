import { ChatUserProfile } from '@/data/chat';

export function getProfilePhoto(userProfile: ChatUserProfile | null): string {
  if (!userProfile) {
    return '/static/images/anonymous.png';
  }
  if (!userProfile.profile_photo) {
    return '/static/images/user_authenticated.png';
  }
  return userProfile.profile_photo;
}
