import axios from "axios";

const api = axios.create({
    baseURL:"https://tahraa.preview.gingertechnologies.app/api",
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