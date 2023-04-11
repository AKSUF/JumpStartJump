import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import {getStoreById }from"../../service/StoreService"

interface Store {
    storeId: number;
    storeName: string;
    storeLocation: string;
    category: string;
    openDay: string;
    storeImage: string;
    storeDesc: string;
    customers: Customer[];
    deliveryMans: DeliveryMan[];
    storeManager: User;
    request: Request;
  
    user: User;
    comments: Comment[];

   storeProducts: StoreProduct[];
  }
  
  interface User {
    user_id: number;
    name: string;
    store: {
      storeId: number;
      storeName: string;
    };
  }
  
  interface Product {
    productId: number;
    productName: string;
    description: string;
    image: string;
    price: number;
    producer: User;
    storeManager: User;
  }

  interface DeliveryMan {
    deliveryManId: number;
    name: string;
  }
  
  interface Customer{
name:string;
image:string;
  }

  interface StoreProduct{
    product:Product;
    quantity:number;
    request:Request;
  }
  
  interface Comment{
    commentId:number;
    content:String;

  }



const Storedetails=()=>{
  const [store, setStore] = useState<Store | null>(null);
  const { storeId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
   
        if (!token) {
          // handle case where user is not logged in
          return;
        }
        const result = await getStoreById(storeId,token);
        setStore(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);


  return(
<div>
  {store ? (
    <div>
   <div className="container">
  <div className="row">
    <div className="col-md-12">
      <h1>Store Information</h1>
      <hr />
    </div>
  </div>
  <div className="row">
    <div className="col-md-4">
      <img src={store.storeImage} className="img-fluid" alt="Store Image" />
    </div>
    <div className="col-md-8">
      <h2>{store.storeName}</h2>
      <p>{store.storeLocation}</p>
      <p>{store.storeDesc}</p>
      <p>Category: {store.category}</p>
      <p>Open Days: {store.openDay}</p>
      <p>Store Manager: {store.storeManager.name}</p>
      <p>Customers:</p>
      <ul>
        {store.customers.map((customer) => (
          <li key={customer.name}>{customer.name}</li>
        ))}
      </ul>
      <p>Delivery Mans:</p>
      <ul>
        {store.deliveryMans.map((deliveryMan) => (
          <li key={deliveryMan.deliveryManId}>{deliveryMan.name}</li>
        ))}
      </ul>
      <p>Store Products:</p>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {store.storeProducts?.map((storeProduct) => (
            <tr key={storeProduct.product.productId}>
              <td>{storeProduct.product.productName}</td>
              <td>{storeProduct.product.description}</td>
              <td><img src={storeProduct.product.image} className="img-fluid" alt="Product Image" /></td>
              <td>{storeProduct.product.price}</td>
              <td>{storeProduct.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Comments:</p>
      <ul>
        {store.comments?.map((comment) => (
          <li key={comment.commentId}>{comment.content}</li>
        ))}
      </ul>
    </div>
  </div>
  <div className="row">
    <div className="col-md-12">
      <a href={`store-request.html?storeId=${store.storeId}`} className="btn btn-primary">Make a Request</a>
    </div>
  </div>
</div>


    </div>
  ) : (
    <p>Loading...</p>
  )}
</div>

  )
}

export default Storedetails;
