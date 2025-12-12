import api from "../../api/axios";
export const submitReachUs = async (data) => {
    const response = await api.post(
        `/api/trainee/public/reach-us`,
        data
    );
    return response.data;
};
