import axios from "axios";

const api = axios.create({
    baseURL:import.meta.env.VITE_API_BASE_URL,
    headers:{"Content-Type":"application/json"},

})

api.interceptors.request.use(
  (config) => {
    let token = null;
    if (typeof window !== "undefined") {
      token =
        localStorage.getItem("traineeToken") ||
        sessionStorage.getItem("traineeToken");
    }
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default api