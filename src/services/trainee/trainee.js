import api from "../../api/axios";

export const getTraineeSavedExperts = async () => {
  try {
    const response = await api.get(
      "/api/trainee/saved-experts?page=1&limit=10"
    );
    console.log("saved-experts", response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTraineeMyExperts = async () => {
  try {
    const response = await api.get(
      "/api/trainee/my-experts?page=1&limit=10"
    );
    console.log("my-experts", response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTraineeProgressSummary = async () => {
  try {
    const response = await api.get("/api/trainee/progress-summary-of-packages");
    console.log("progress-summary", response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};
