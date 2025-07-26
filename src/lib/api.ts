import axios from "axios";

interface AuthPayload {
  userName: string;
  password: string;
}

interface CoursePayload {
  title: string;
  description: string;
  imageUrl: string;
  duration: number;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const login = async (payload: AuthPayload) => {
  const response = await api.post("/login", payload);
  return response.data;
};

export const register = async (payload: AuthPayload) => {
  const response = await api.post("/user/new", payload);
  return response.data;
};

export const listCourses = async () => {
  try {
    const response = await api.get("/course/list");
    return response.data.courses;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const createCourse = async (payload: CoursePayload) => {
  let token = null;

  if (typeof window !== "undefined") {
    token = window.localStorage.getItem("token")!;
  }

  try {
    const response = await api.post("/course/new", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
