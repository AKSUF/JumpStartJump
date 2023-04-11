import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1";

export const getStoreById = async (storeId: number, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${BASE_URL}/store/${storeId}`, config);
  return response.data; // Return only the data property
};
