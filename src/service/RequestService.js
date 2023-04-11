import axios from "axios";



export const sendProductRequest = async(requestDto, productId, producerId, token) => {
    try {
        const response = await axios.post(`/api/v1/storemanager/products/${productId}/request`, requestDto, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                producerId: producerId,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};



export const incrementRequestQuantity = function(requestId, token) {
    return axios.put(`/api/v1/requests/${requestId}/incrementQuantity`, {}, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        .then(function(response) {
            return response.data;
        })
        .catch(function(error) {
            throw error;
        });
};

export const decrementRequestQuantity = function(requestId, token) {
    return axios.put(`/api/v1/requests/${requestId}/incrementQuantity`, {}, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        .then(function(response) {
            return response.data;
        })
        .catch(function(error) {
            throw error;
        });
};
export const getAllRequests = (token) => {
    return axios.get("/api/v1/storemanager/request", {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};


export const getProductRequest = async(productId, token) => {
    try {
        const response = await axios.get(`/api/v1/storemanager/request/product/${productId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getAllProductRequest = async(token) => {
    try {
        const response = await axios.get(`/api/v1/storemanager/request`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};





export const acceptProductRequest = async(requestId, token) => {
    try {
        const response = await axios.post(`/api/v1/storemanager/request/${requestId}/accept`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getAllAcceptedRequest = async(storeManagerId, token) => {
    try {
        const response = await axios.get(`/api/v1/request/${storeManagerId}/acceptedrequest`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};