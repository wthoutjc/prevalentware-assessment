import axios from "axios";
import { signOut } from "next-auth/react";

const api = axios.create({
  baseURL: process.env.NEXTAUTH_URL,
});

api.interceptors.response.use(
  (response) => {
    if (response.config.method === "options") return Promise.resolve(response);
    return response;
  },
  async (error) => {
    if (error.response.status === 401) await signOut({ redirect: false });
    return Promise.reject(error);
  }
);

export { api };
