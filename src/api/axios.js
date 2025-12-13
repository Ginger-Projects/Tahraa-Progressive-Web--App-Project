import axios from "axios";

const api = axios.create({
    baseURL:"https://tahraa.preview.gingertechnologies.app/api",
    timeout: 30000,
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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.code === "ECONNABORTED" || /timeout/i.test(error?.message || "")) {
      return Promise.reject(new Error("Request timeout exceeded. Please try again."));
    }

    if (!error?.response) {
      return Promise.reject(new Error("Network error. Please check your internet connection."));
    }

    return Promise.reject(error);
  }
);


export default api