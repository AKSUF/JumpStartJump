import React, { useState } from "react";
import {  useParams } from "react-router-dom";
import { orderProduct } from "../../service/deliveryService";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Typography } from "@material-ui/core";
import CreditCardIcon from '@material-ui/icons/CreditCard';
import CashIcon from '@material-ui/icons/Money';
import Stripe from"../../assets/public/Untitled.jpeg"
import Bkash from"../../assets/public/bkash.png"
const PaymentForm = () => {
  const { productId } = useParams();
  const [deliveryData, setDeliveryData] = useState({
    address: "",
    delivery_number: "",
    phoneNumber: "",
    receiverName: "",
    quantity: 1, // default quantity
    totalPrice: 0, // will be calculated on the backend
  });


  const handleInputChange = (event:any) => {
    const { name, value } = event.target;
    setDeliveryData({ ...deliveryData, [name]: value });
  };

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    try {
      const response = await orderProduct(
        deliveryData,
        productId,
        localStorage.getItem("token")
      );
      console.log(response.data);
      // Redirect to a success page or show a success message
   
    } catch (error:any) {
      console.log(error.response.data);
      // Show an error message or handle the error as needed
    }
  };

  


  return (
    <div className="flex flex-col items-center  ">
    <Typography variant="h5" gutterBottom>
      Delivery Form
    </Typography>
   
    <form onSubmit={handleSubmit} className=" bg-gray-200 shadow pt-5 pl-12 pr-12 mb-5">
      <div>
        <label htmlFor="address" className="text-gray-600">
          Delivery Address:
        </label>
        <input
          type="text"
          name="address"
          id="address"
          value={deliveryData.address}
          onChange={handleInputChange}
          required
          className="w-full border border-gray-300 p-2 rounded-lg mt-2"
        />
      </div>
     
      <div>
        <label htmlFor="phoneNumber" className="text-gray-600">
          Phone Number:
        </label>
        <input
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          value={deliveryData.phoneNumber}
          onChange={handleInputChange}
          required
          className="w-full border border-gray-300 p-2 rounded-lg mt-2"
        />
      </div>
      <div>
        <label htmlFor="receiverName" className="text-gray-600">
          Receiver Name:
        </label>
        <input
          type="text"
          name="receiverName"
          id="receiverName"
          value={deliveryData.receiverName}
          onChange={handleInputChange}
          required
          className="w-full border border-gray-300 p-2 rounded-lg mt-2"
        />
      </div>
      <div className="mt-6 flex">
    
   <div>

   <div>
   <button
          type="submit"
          className=" text-blue-400 py-2 px-4 rounded-lg "
        >

        <img src={Stripe} alt="delivery" width="150" height="150" />
        </button>
        <Typography variant="body2" align="center">

        </Typography>
      </div>




   </div>
   <div>
   <button
          type="submit"
          className="  text-blue-400 py-2 px-4 rounded-lg"
        >

<img src={Bkash} alt="delivery" width="150" height="150" />
        </button>
        <Typography variant="body2" align="center">
 
        </Typography>
      </div>
   <div>



    
   </div>
      </div>
    </form>
  </div>
  );
};

export default PaymentForm;
