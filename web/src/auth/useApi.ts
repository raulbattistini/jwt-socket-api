import { api } from "../services/api";

export const useApi = () => ({
  validateToken: async (token: string) => {
    const response = await api.post("/token", { token });
    return response.data;
  },
  login: async (username: string, password: string) => {
    const response = await api.post("/token", { username, password });
    return response.data;
  },
  signout: async () => {
    const response = await api.post("/");
    return response.data;
  },
});
