const getBackendUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin; // Use browser URL when available
  }
  return ''; // Return empty string
};

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || getBackendUrl();
export const baseUrl = backendUrl ? `${backendUrl}/api` : '';
export const wsBaseUrl = backendUrl ? `${backendUrl.replace(/^http/, 'ws')}/ws` : '';

export const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '';
