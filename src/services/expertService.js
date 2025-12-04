import api from "../api/axios";

export const getExpertService = async() =>{
  try {
    const response = await api.get("/api/trainee/public/experts?page=1&limit=10");
    console.log("response",response);
    
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getPackages = async() =>{
    try {
        const response = await api.get("/api/trainee/public/packages?page=1&limit=10");
        return response.data;
    } catch (error) {
        throw error;
    }
}