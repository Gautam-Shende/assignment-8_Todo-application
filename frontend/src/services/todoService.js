import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 20000,
  headers: { "Content-Type": "application/json" },
});

const handleRequest = async (requestFn) => {
  try {
    const { data } = await requestFn();
    return data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Something went wrong" };
  }
};

export const getTodos = (params) => {
  return handleRequest(() => api.get("/api/todos/", { params }));
};

export const createTodo = (payload) => {
  return handleRequest(() => api.post("/api/todos/", payload));
};

export const updateTodo = (id, payload) => {
  return handleRequest(() => api.put(`/api/todos/${id}`, payload));
};

export const deleteTodo = (id) => {
  return handleRequest(() => api.delete(`/api/todos/${id}`));
};
