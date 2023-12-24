import Cookies from "universal-cookie";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`



const cookies = new Cookies();

const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      headers.set("X-CSRFToken", cookies.get("csrftoken"))
      return headers
    }
  })


// initialize an empty api service that we'll inject endpoints into later as needed
const api_init = createApi({
    baseQuery,
    endpoints: () => ({}),
})

export const api = api_init.enhanceEndpoints({
    addTagTypes: ["Cart", "User"],
});