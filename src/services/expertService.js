import api from "../api/axios";

export const getExpertService = async () => {
  try {
    const response = await api.get("/api/trainee/public/experts?page=1&limit=10");
    console.log("response", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPackages = async () => {
  try {
    const response = await api.get("/api/trainee/public/packages?page=1&limit=10");
    console.log("response",response);
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await api.get("/api/common/get-all-categories");

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Upload previous work files (images/videos) to S3 via backend
// formData should contain previousWorkFiles[0], previousWorkFiles[1], ...
export const uploadPreviousWork = async (formData) => {
  try {
    const response = await api.post(
      "/api/expert/uploads/previous-work", // TODO: adjust to your real upload route
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return response.data; // expected: { urls: ["https://...", ...] }
  } catch (error) {
    throw error;
  }
};

export const registerExpert = async (payload) => {
  try {
    const isFormData = payload 
    const config = isFormData
      ? { headers: { "Content-Type": "multipart/form-data" } }
      : undefined;

    const response = await api.post("/api/expert/auth/onboarding", payload, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};