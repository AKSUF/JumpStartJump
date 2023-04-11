import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { addStoreDetails, uploadStoreImage,updateStore } from "../../service/StoreService";
import { Box, Container, Grid, Typography } from "@mui/material";
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


const UpdateStore = () => {

  const { storeId } = useParams();
  const token = localStorage.getItem("token");
  const [imageFile, setImageFile] = useState();
  const [storeImage,setImage] = useState<any>();
  const [filebase64,setFileBase64] = useState<string>("")
  const [store, setStore] = useState({
    storeName: "",
    storeLocation: "",
    category: "",
    storedesc: "",
    openday: "",
    closes:"",
  });




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


  const handleSubmit = (event:any) => {

const token=localStorage.getItem("token")
    updateStore(storeId,{...store}, token)
    
      .then((data) => {
        uploadStoreImage(storeId, imageFile, token)

        .then((data) => {
console.log(storeId)
          toast.success("Image uploaded");
        })
        .catch((error) => {
          toast.error("error in uploading image");
          console.log(error);
        });

        toast.success("Store details updated successfully!");
        console.log(data);
      })
      .catch((error) => {
        toast.error("Error in updating store details!");
        console.log(error);
      });
    }
   
const handleChange=(event:any,fieldName:any)=>{
  console.log(fieldName + " " + event.target.value);
  setStore({
    ...store,
    [fieldName]: event.target.value,
  });

};

function convertFile(files: FileList|null) {
  if (files) {
    const fileRef = files[0] || ""
    const fileType: string= fileRef.type || ""
    console.log("This file upload is of type:",fileType)
    const reader = new FileReader()
    reader.readAsBinaryString(fileRef)
    reader.onload=(ev: any) => {
      // convert it to base64
      setFileBase64(`data:${fileType};base64,${btoa(ev.target.result)}`)
    }
  }
}
const fileToBase64 = async (file: any) =>
new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = (e) => reject(e);
});


const preview = async (e: any) => {
  const imageStr: any = await fileToBase64(e.target.files[0]);
  setImage(imageStr);
  setImageFile(e.target.files[0]);
};



const handleFileChage = (event: any) => {
  console.log(event.target.files[0]);
  setImageFile(event.target.files[0]);
};



  


  




  return (
    <div className=" bg-gray-50">
  <div className="p-14 m-0">
        <Grid container spacing={1}>
          <Grid xl={4} md={3} xs={0}></Grid>
          <Grid xl={4} md={6} xs={12}>
            <div className=" rounded-lg bg mb-16 border-2 border-gray-300 shadow-xl p-2">
              <div className="text-center text-2xl text-red-900 py-5 pt-10 font-bold uppercase font-serif">
                ADD STORE DETAILS
              </div>
              <hr></hr>

              <form onSubmit={handleSubmit}>
                <div className="form-group   m-3 ">
                  <label className="font-bold" htmlFor="storeName">
                    Store Name:
                  </label>
                  <input
                    type="text"
                    id="storeName"
                    name="storeName"
                    value={store.storeName}
                    onChange={(event)=>handleChange(event,'storeName')}
                    className="form-control 
              w-full
              p-2
              py-1.5
              text-base
              font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none required"
                  />
                </div>

                <div className="form-group   m-3 ">
                  <label className="font-bold" htmlFor="category">
                    Store Category:
                  </label>
                  <select
                    id="category"
                    name="category"
                    onChange={(event)=>handleChange(event,'category')}
                    value={store.category}
                    className="form-control block
              w-full
              p-2
              py-1.5
              text-base
              font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none required"
                  >
                    <option disabled value={0}>
                      -- Select Category --
                    </option>
                    <option className=" font-bold">
                      Makeup
                    </option>
                    <option className=" font-bold ">
                      Grocery
                    </option>
                    <option className=" font-bold ">
                      Electronic
                    </option>
                    <option className=" font-bold ">
                      Fruit
                    </option>
                    <option className=" font-bold ">
                      Flower shop
                    </option>
                    <option className=" font-bold ">
                      Machinery
                    </option>
                    <option className=" font-bold ">
                      Book Shop
                    </option>
                    <option className=" font-bold ">
                      Furniture Shop
                    </option>
                    <option className=" font-bold ">
                      Toys Shop
                    </option>
                  </select>
                </div>

                <div className="form-group mb-1 m-3">
                  <label className="font-bold" htmlFor="availableDays">
                    Available:
                  </label>
                  <select
                    id="availableDays"
                    name="availableDays"
             
                    onChange={(event)=>handleChange(event,'availableDays')}
 
                    multiple
                    className="form-control block
              w-full
              p-2
              py-1.5
              text-base
              
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none required"
                  >
                    
                    <option className=" font-bold text-[14px] border-b ">
                    Sunday
                    </option>
                    <option className=" font-bold text-[14px] border-b ">
                    Monday
                    </option>
                    <option className=" font-bold text-[14px] border-b ">
                    Tuesday
                    </option>
                    <option className=" font-bold text-[14px] border-b  ">
                    Wednesday
                    </option>
                    <option className=" font-bold text-[14px] border-b ">
                      
                    Friday
                    </option>
                    <option className=" font-bold text-[14px] border-b ">
                    Saturday
                    </option>
                  </select>
                </div>

                <div className="flex">
                  <div className="form-group mb-1 m-3 w-6/12">
                    <label className="font-bold" htmlFor="openday">
                      Store Opens
                    </label>
                    <input
                      type="time"
                      id="openday"
                      name="openday"
                      onChange={(event)=>handleChange(event,'openday')}
                      value={store.openday}
                      className="form-control block
              w-full
              p-2
              py-1.5
              text-base
              font-normal
             text-gray-700
             bg-white bg-clip-padding
             border border-solid border-gray-300
             rounded
             transition
             ease-in-out
             m-0
             focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
                    />
                  </div>
                  <div className="form-group mb-1 m-3 w-6/12">
                    <label className="font-bold" htmlFor="closes">
                      Store Closes:
                    </label>
                    <input
                      type="time"
                      id="closes"
                      name="closes"
                      onChange={(event)=>handleChange(event,'closes')}
                      value={store.closes}
                      className="form-control block
              w-full
              p-2
              py-1.5
              text-base
              font-normal
             text-gray-700
             bg-white bg-clip-padding
             border border-solid border-gray-300
             rounded
             transition
             ease-in-out
             m-0
             focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="form-group mb-1 m-3">
                  <label className="font-bold" htmlFor="storeLocation">
                    Store Address:
                  </label>
                  <input
                    type="text"
                    id="storeLocation"
                    name="storeLocation"
                    onChange={(event)=>handleChange(event,'storeLocation')}
                    value={store.storeLocation}
                    className="form-control block
              w-full
              p-2
              py-1.5
              text-base
              font-normal
             text-gray-700
             bg-white bg-clip-padding
             border border-solid border-gray-300
             rounded
             transition
             ease-in-out
             m-0
             focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
                  />
                </div>

                <div className="form-group mb-1 m-3">
                  <div className="my-3 text-left">
                    <label htmlFor="storeImage" className="fw-bold">
                      Select Image
                    </label>
                    <div>
                      <input
                        id="storeImage"
                        type="file"
                        onChange={handleFileChage}

                      />
                    </div>
                  </div>

                  {/* <div>
                    <input id="store_image" type="file" onChange={handleFileChage} />
                  </div> */}
                </div>

                <div className="form-group mb-1 m-3">
                  <label className="font-bold" htmlFor="storedesc">
                    Store Description:
                  </label>
                  <textarea
                    id="storedesc"
                    name="storedesc"
                    onChange={(event)=>handleChange(event,'storedesc')}
                    value={store.storedesc}
                    className="form-control block
              w-full
              p-2
              py-1.5
              text-base
              font-normal
             text-gray-700
             bg-white bg-clip-padding
             border border-solid border-gray-300
             rounded
             transition
             ease-in-out
             m-0
             focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
                  />
                </div>
                <Box className="sm:pl-20 pl-10">
                  <button onClick={(e) => handleSubmit(e)} className="  bg-sky-800 mt-2 mb-5 py-2 font-bold  hover:bg-sky-700  700   w-10/12   text-white rounded-md  ">
                    Add Store Details
                  </button>
                </Box>
                <Box className=" "></Box>
              </form>
            </div>
          </Grid>
          <Grid xl={4} md={3} xs={0}></Grid>
        </Grid>
      </div>






    </div>
  );
};

export default UpdateStore;

