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

export const getPackageById = async(id) =>{
  try {
    const packageId = id || '69328c9496d78780dadaefcf'
    const response = await api.get(`/api/trainee/marketplace/package?packageId=${packageId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const bookPackage = async ({ packageId, startDateUtc, endDateUtc }) => {
  try {
    const response = await api.post("/api/trainee/marketplace/request-a-package", {
      packageId,
      startDate:startDateUtc,
      endDate:endDateUtc,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
