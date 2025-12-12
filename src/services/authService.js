import api from "../api/axios";

export const signupTrainee = async (payload) => {
  try {
    // Adjust the endpoint and payload shape if your backend expects different fields
    const response = await api.post("/api/trainee/auth/register", payload);
    console.log("response",response);
    
    return response.data;
  } catch (error) {
    console.log("error",error);
    
    throw error;

  }
};

export const loginTrainee = async (payload) => {
  try {
    const response = await api.post("/api/trainee/auth/login", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async (payload) => {
  try {
    const response = await api.post("/api/trainee/public/forgot-password", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

