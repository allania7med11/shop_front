import axios from "axios";

export const useApi = () => {
  const client = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
  });
  return client;
};

