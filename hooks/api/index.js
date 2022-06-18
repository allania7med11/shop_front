import axios from "axios";


export const useApi = () => {
  const client = axios.create({
    baseURL: `/api`,
  });
  return client;
};

