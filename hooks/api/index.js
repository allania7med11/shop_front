import axios from "axios";

console.log("BACKEND_URL: ", process.env.NEXT_PUBLIC_BACKEND_URL)
export const useApi = () => {
  const client = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
  });
  return client;
};

