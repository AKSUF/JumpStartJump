import axios from "axios";

export const addProductDetails = (ProductData, token, userId) => {
    return axios.post(`/api/v1/producer/product/producer/${ProductData.storeId}`, ProductData, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const getAllProducts = (token) => {
    return axios.get("/api/v1/producer/product/productdetails", {

        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const getAllProducteveryone = (token) => {
    return axios.get("/api/v1/producer/product/productdetail", {

        headers: {
            Authorization: "Bearer " + token,
        },
    });
};



export const getProductSingleDetails = (productId, token) => {
    return axios
        .get("/api/v1/producer/products/" + productId, {

            headers: {
                Authorization: "Bearer " + token,
            },
        });
};


export function deleteProducts(productId, token) {
    return axios.delete(`/api/v1/producer/products/${productId}`, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
}

export const updateProducts = (productId, ProductData, token) => {
    return axios.put(`/api/v1/producer/productedit/${productId}`, ProductData, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};

export const loadAllProducts = (pageNumber, pageSize) => {
    return axios
        .get(
            `/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`
        )
        .then((response) => response.data);
};


export async function uploadProductImage(productId, imagefile, token) {
    let formData = new FormData();
    formData.append("image", imagefile);
    return axios.post(
        `/api/v1/producer/product/${productId}`,
        formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + token,
            },
        }
    );
}



export const getProductById = (productId, token) => {
    console.log(productId)
    console.log(token)
    return axios.get(`/api/v1/producer/product/getproduct/${productId}`, {
        headers: {
            Authorization: "Bearer " + token,
        },
    });
};