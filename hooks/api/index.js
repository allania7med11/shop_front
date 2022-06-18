import axios from "axios";


export const useApi = () => {
  const requestService = axios.create({
    baseURL: `${process.env.SHOP_BACKEND_URL}/api`,
  });
  return requestService;
};

