import axios from "axios";


export const useApi = () => {
  const client = axios.create({
    baseURL: `${process.env.SHOP_BACKEND_URL}/api`,
  });
  return client;
};

