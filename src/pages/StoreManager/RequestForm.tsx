import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { sendProductRequest } from "../../service/RequestService";

const RequestForm = () => {
  const { productId } = useParams();
  const [request, setRequest] = useState({
    quantity: 1, // default quantity
    description: "",
  });

  const handleInputChange = (event:any) => {
    const { name, value } = event.target;
    setRequest({ ...request, [name]: value });
  };

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    try {
      const response = await sendProductRequest(
        request,
        productId,
        localStorage.getItem("userId"),
        localStorage.getItem("token")
      );
      console.log(response.data);
      // Redirect to a success page or show a success message
    } catch (error) {
      console.log(error);
      // Show an error message or handle the error as needed
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          min="1"
          value={request.quantity}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          id="description"
          value={request.description}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <button type="submit">Submit Request</button>
      </div>
    </form>
  );
};

export default RequestForm;
