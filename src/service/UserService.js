import axios from "axios";
export const getUserById = (userId, token) => {
    return axios.get(`/api/v1/users/${userId}`, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};