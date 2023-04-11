import axios from "axios";

export const orderProduct = (deliveryData, productId, token) => {
    console.log("fhfhjfhjfyhhtuytuygfhh////////////////////////////////////////" + token)
    return axios.post(`/api/v1/customer/orders/${productId}`, deliveryData, {

        headers: {

            Authorization: "Bearer " + token,
        },
    });
};


export const assignDeliveryman = (deliveryId, deliverymanId, token) => {
    return axios.post(`/api/v1/customer/riders/assign/${deliveryId}/${deliverymanId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.data)
        .catch(error => console.log(error));
};




export const getAllOrders = async(token) => {
    console.log("fhfhjfhjfyhhtuytuygfhh////////////////////////////////////////" + token)
    try {
        const response = await axios.get("/api/v1/customer/orders/alluserorder", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};


export const getAllOrdersForDeliveryman = async(token) => {
    console.log("fhfhjfhjfyhhtuytuygfhh////////////////////////////////////////" + token)
    try {
        const response = await axios.get("/api/v1/customer/orders/delivery", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};



export const getAllStoreProducts = async(token) => {
    console.log("fhfhjfhjfyhhtuytuygfhh////////////////////////////////////////" + token)
    try {
        const response = await axios.get("/api/v1/manage/store/storeproduct", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};






export const getAllRiders = async(token) => {
    try {
        const response = await axios.get('/api/v1/customer/riders', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const acceptDeliveryRequest = async(deliveryId, token) => {
    try {
        const response = await axios.post(`/api/v1/customer/accept/${deliveryId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};