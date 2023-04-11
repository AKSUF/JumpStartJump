import React, { useState, useEffect } from "react";
import { getAllCartItems } from "../../service/CarService";
import {updateCartItemQuantity}from "../../service/CarService"
import { CardMedia,Card,CardContent,Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { toast } from "react-toastify";
import {orderProduct} from"../../service/deliveryService"
import { Link } from 'react-router-dom';
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { Grid } from "@material-ui/core";
interface CartItem {
    cartitemId: number;
    product: {
        productName: string;
      price: number;
      image: string;// add image URL to CartItem interface
      productId:number;
    };
    quantity: number;
  }

  interface Cart {
    cartId: number;
    cartItems: CartItem[];
  }

type Props = {
    role: String;
  };
  
  const CartItemList = (props: Props) => {

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [token, setToken] = useState<string | null>(null);
    const [open, setOpen] = useState(false);


    const [delivery, setDelivery] = useState({
      phoneNumber: "",
      address: "",
      receiverName: "",
    
    });

    const fieldChanged = (event: any) => {
      setDelivery({ ...delivery, [event.target.name]: event.target.value });
      console.log(delivery);
    };

    const handleSubmit = (event: any) => {
      event.preventDefault();
      if (
        delivery.phoneNumber.length <= 1 ||
        delivery.address.length <= 0 ||
        delivery.receiverName.length <= 5
     
      ) {
        toast.error("Please fill in all required Data");
        return;
      }
      if (delivery.phoneNumber.trim() === "") {
        toast.error("Store Name is Required");
        return;
      }
      if (delivery.address.trim() === "") {
        toast.error("Store Address is Required");
        return;
      }
      if (delivery.receiverName.trim() === "") {
        toast.error("Store Description is Required");
        return;
      }
  
      


      orderProduct(delivery, token)
      .then((res) => {
        console.log(res.data.delivery);
      
        toast.success("order details uploaded Details Uploaded");
        console.log(delivery);
        setDelivery({
          phoneNumber: "",
          address: "",
          receiverName: "",
         });
      })
      .catch((error) => {
        toast.error("order Details not  Uploaded due to some error !! ");
        console.log(error);
      });
  };





    useEffect(() => {
      setToken(localStorage.getItem("token"));
    }, []);
    useEffect(() => {
      const token = localStorage.getItem("token");
      getAllCartItems(token)
        .then((response) => {
          let allCartItems: CartItem[] = [];
          for (let cart of response.data) {
            allCartItems = allCartItems.concat(cart.cartItems);
          }
          setCartItems(allCartItems);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

      const handleAddQuantity = (cartItemId: number) => {
        const updatedCartItems = cartItems.map((item) => {
          if (item.cartitemId === cartItemId) {
            item.quantity += 1;
            updateCartItemQuantity(token, cartItemId, item.quantity);
          }
          return item;
        });
        setCartItems(updatedCartItems);
      };
      
      const handleRemoveQuantity = (cartItemId: number) => {
        const updatedCartItems = cartItems.map((item) => {
          if (item.cartitemId === cartItemId) {
            item.quantity -= 1;
            updateCartItemQuantity(token, cartItemId, item.quantity);
          }
          return item;
        });
        setCartItems(updatedCartItems);
      };
   
      const total = cartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
      const deliveryCharge = 5.0;
      const tax = 0.1 * total;
      const grandTotal = total + deliveryCharge + tax;

    return (
        <div>
      
      
          {cartItems.map((item) => (
         
         <Grid container spacing={2}>
         <Grid item xs={12} sm={4} md={4} lg={4}>
        
         </Grid>
         <Grid item xs={12} sm={4} md={4} lg={7}>
        
         <Card key={item.cartitemId} className="flex pb-4 pt-4">
         <CardMedia
                  component="img"
                  alt="Not Uploaded"
                  style={{
                    width: "20%",

                  }}
                  image={
                    "http://localhost:3000/api/v1/producer/product/image/" +
                    item.product.image // use image URL from CartItem object
                  }
                />

         <div className="flex-grow p-4">
           <CardContent>
             <h4 className="font-bold mb-4">{item.product.productName}</h4>
             <p className="text-gray-600">${item.product.price.toFixed(2)}</p>
           </CardContent>
           <CardContent className="flex items-center">
             <Button
               onClick={() => handleRemoveQuantity(item.cartitemId)}
               startIcon={<RemoveCircle/>}
               variant="outlined"
               color="secondary"
               size="small"
               className="mr-2"
             >
               Remove
             </Button>
             <div className="flex items-center justify-center border border-gray-400 rounded-md px-2 py-1 mx-2">
               {item.quantity}
             </div>
             <Button
               onClick={() => handleAddQuantity(item.cartitemId)}
               startIcon={<AddCircle />}
               variant="outlined"
               color="primary"
               size="small"
               className="ml-2"
             >
               Add
             </Button>


           </CardContent>


                </div>
               
<CardContent>
<div className="cart-summary">
        <div className="cart-summary-item">
          <span>Subtotal:</span>
          <span>$100.00</span>
        </div>
        <div className="cart-summary-item">
          <span>Delivery Charge:</span>
          <span>$5.00</span>
        </div>
        <div className="cart-summary-item">
          <span>Tax:</span>
          <span>$10.00</span>
        </div>
        <div className="cart-summary-item total">
          <span>Total:</span>
          <span>$115.00</span>
        </div>
        <Link to={`customer/product/${item.product.productId}`}>
        <Button variant="contained" color="primary" className="cart-order-btn">
          Order
        </Button>

        </Link>

      </div>



</CardContent>




              </Card>






         </Grid>
         <Grid item xs={6} sm={2} md={2} lg={2}>
         
         </Grid>
       </Grid>
      
           
          ))}
     
     

      </div>
  );
}

export default CartItemList;

