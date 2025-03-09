const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
export const baseUrl = `${backendUrl}/api`;
export const wsBaseUrl = `${backendUrl.replace(/^http/, 'ws')}/ws`;
export const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '';
