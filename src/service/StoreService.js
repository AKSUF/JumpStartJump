import axios from "axios";
export const addStoreDetails = (StoreData, token) => {
    return axios.post(`/api/v1/manage/store`, StoreData, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export async function uploadStoreImage(storeId, imagefile, token) {
    let formData = new FormData();
    formData.append("file", imagefile);
    return axios.post(
        `/api/v1/manage/store/image/${storeId}`,
        formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + token,
            },
        }
    );
}

export const updateStore = (storeId, storeDto, token) => {
    return axios.put(`/api/v1/manage/store/${storeId}`, storeDto, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};



export const showAllStore = (token) => {
    return axios.get("/api/v1/manage/store", {

        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const getStoreById = async(storeId, token) => {
    try {
        const response = await axios.get(`/api/v1/manage/store/${storeId}`, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error.response.data);
        // Handle error as needed
    }
};


// Frontend Service
export const getAllRequests = async(token) => {
    try {
        const response = await axios.get('/request', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};


export const addProductToStore = async(
    productId,
    storeId,
    requestProductDto,
    requestId,
    token
) => {
    try {
        const response = await axios.post(
            `/api/v1/storemanager/requestproductbuy/${productId}/payment/${requestId}`,
            requestProductDto, {
                headers: {
                    Authorization: "Bearer " + token,
                },
                params: {
                    storeId: storeId,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.log(error.response.data);
        // Handle error as needed
    }
};

export const getAllStoreManager = async(token) => {
    try {
        const response = await axios.get('/api/v1/customer/storemanager', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};


export const getAllProductStore = async(token) => {
    try {
        const response = await axios.get(`/api/v1/manage/store/storeproduct`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
export const getAllStoreProduct = async(token) => {
    try {
        const response = await axios.get(`/api/v1/manage/store/storeproduct`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};