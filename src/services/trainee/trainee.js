import api from "../../api/axios";

export const getTraineeSavedExperts = async (page = 1, limit = 3) => {
  try {
    const response = await api.get(
      `/api/trainee/saved-experts?page=${page}&limit=${limit}`
    );
    console.log("saved-experts", response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getTraineeUpcomingSchedules = async ({ fromDate, toDate, page = 1, limit = 10 }) => {
  try {
    const response = await api.get("/api/trainee/upcoming-schedules", {
      params: {
        page,
        limit,
        fromDate,
        toDate,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTraineePackageSummary = async ({ startDate, endDate, page = 1, limit = 10 }) => {
  try {
    const response = await api.get("/api/trainee/package-summary", {
      params: {
        startDate,
        endDate,
      },
    });
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


export const getTraineeMyExperts = async (page = 1, limit = 3) => {
  try {
    const response = await api.get(
      `/api/trainee/my-experts?page=${page}&limit=${limit}`
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


export const getPackageById = async (id) => {
  try {
    const packageId = id
    const response = await api.get(`/api/trainee/marketplace/package?packageId=${packageId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const bookPackage = async ({ packageId, startDateUtc, endDateUtc, invite }) => {
  try {
    const payload = {
      packageId,
      startDate: startDateUtc,
      endDate: endDateUtc,
    };

    if (invite) {
      payload.invite = invite;
    }
    const response = await api.post("/api/trainee/marketplace/request-a-package", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const schedulePackageSession = async ({ packageId, bookingId, startLocalUTC, endLocalUTC }) => {
  try {
    const response = await api.post("/api/trainee/marketplace/schedule-session", {
      packageId,
      bookingId,
      startDate: startLocalUTC,
      endDate: endLocalUTC,
    });
    console.log("responseforschedule", response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const reschedulePackageSession = async ({ sessionId, startNewDate, endNewDate }) => {
  try {
    console.log("sesion", sessionId, startNewDate, endNewDate);

    const response = await api.post("/api/trainee/marketplace/request-session-reschedule", {
      sessionId,
      newStartDate: startNewDate,
      newEndDate: endNewDate,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cancelScheduledSession = async ({ id, reason }) => {
  try {
    const response = await api.post(
      "/api/trainee/marketplace/cancel-scheduled-session",
      {
        sessionId: id,
        reason,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getTraineeProfile = async () => {
  try {
    const response = await api.get("/api/trainee/profile/get-trainee-profile");
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const updateTraineePersonalInfo = async ({
  name,
  dateOfBirth,
  location,
  countryCode,
  phoneNumber,
}) => {
  try {
    console.log("name", name, dateOfBirth, location, countryCode, phoneNumber);

    const response = await api.post("/api/trainee/profile/update-personal-info", {
      name,
      dateOfBirth,
      location,
      countryCode,
      mobile: phoneNumber,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTraineeProfileImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("profileImage", file);

    const response = await api.post(
      "/api/trainee/profile/update-profile-image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTraineeNotifications = async () => {
  try {
    const response = await api.get("/api/trainee/notifications");
    return response.data;
  } catch (error) {
    throw error;
  }
};

