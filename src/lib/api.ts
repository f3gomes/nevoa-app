import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

interface AuthPayload {
  userName: string;
  password: string;
}

export const login = async (payload: AuthPayload) => {
  const response = await api.post("/login", payload);
  return response.data;
};

export const register = async (payload: AuthPayload) => {
  const response = await api.post("/user/new", payload);
  return response.data;
};
