import axios from "axios";
import {getSession, signOut} from "next-auth/react";

const api = axios.create({
  baseURL: "/fire-backend",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    credentials: "include"
  },
});

api.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.user?.accessToken) {
      config.headers.Authorization = `Bearer ${session.user.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response.data; // Return hanya data, bukan keseluruhan response Axios
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      signOut({
        redirect: true,
        callbackUrl: "/login",
      });
    }
    return Promise.reject(error);
  }
);

export default api;
