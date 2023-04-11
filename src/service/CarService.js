import axios from "axios";
export const addProductToCart = (productId, cartItemData, token) => {
    return axios.post(`/api/v1/cart/${productId}`, cartItemData, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};
export const getAllCartItems = (token) => {
    if (token) {
        return axios.get("/api/v1/cart/cart/getallitem", {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
    } else {
        throw new Error("Token is null.");
    }
};

export const updateCartItemQuantity = (token, cartItemId, quantity) => {
    const data = {
        cartitemId: cartItemId,
        quantity: quantity
    };
    return axios.put("/api/v1/cart/updatequantity", data, {
        headers: {
            Authorization: "Bearer " + token
        }
    });
};
const BASE_URL = "http://localhost:5000/api";

export const getStoreById = async(storeId: number, token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(`${BASE_URL}/store/${storeId}`, config);
    return response.data; // Return only the data property
};