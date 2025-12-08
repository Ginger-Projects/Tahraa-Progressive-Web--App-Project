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

export const getPackageAndBookingDetailsForSessionSchedule = async (bookingId) => {
  try {
    
    const response = await api.get(
      `/api/trainee/package-and-booking-details-for-session-schedule?bookingId=${bookingId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPackageSessions = async (packageId, startDate, endDate) => {
  try {
    const packageId = '692eb8ded93c9c77f8633b3a'
    const startDate = '2025-12-08T11:30:00.000Z'
    const endDate = '2025-12-31T12:30:00.000Z'
    const response = await api.get("/api/trainee/get-package-sessions", {
      params: {
        packageId,
        startDate,
        endDate,
      },
    });
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

export const getTraineeMyPackages = async (page = 1, limit = 3) => {
  try {
    const response = await api.get(
      `/api/trainee/my-packages?page=${page}&limit=${limit}`
    );

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
