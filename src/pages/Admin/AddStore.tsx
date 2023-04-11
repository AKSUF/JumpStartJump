
import { toast } from "react-toastify";
import { addStoreDetails, uploadStoreImage,getAllStoreManager } from "../../service/StoreService";
import { Box, Container, Grid, Select, Typography } from "@mui/material";
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import MenuItem from "../Manager/MeanuItem";
interface Delivery {
  deliverId: number;
  address: string;
  delivery_number: number;
  status: string;
  phoneNumber: string;
  receiverName: string;
  product: {
    productId: number;
    productName: string;
    image:string;
    
  };
    customer: User;
    storemanager: User;

}



interface User {
  user_id: number;
  name: string;
  profile_image: String;

}





const AddStore = () => {
  const token = localStorage.getItem("token");
  const [imageFile, setImageFile] = useState();
  const [storeImage,setImage] = useState<any>();
  const [filebase64,setFileBase64] = useState<string>("")
  const [storemanager, setStoremanager] = useState<any>([]);
  const [orders, setOrders] = useState([]);
  const [selectedStorManager, setSelectedStorManager] = useState<User[]>([]);

  const [options, setOptions] = useState([
    " Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Friday",
    "Saturday",
  ]);
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

  const [store, setStore] = useState({
    storeName: "",
    storeLocation: "",
    storedesc: "",
   
    category:"",
    openday: "",
   
   
  });
  const fieldChanged = (event: any) => {
    setStore({ ...store, [event.target.name]: event.target.value });
    console.log(store);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (
      store.storeName.length <= 1 ||
      store.storeLocation.length <= 3 ||
      store.storedesc.length <= 5
    ) {
      toast.error("Please fill in all required Data");
      return;
    }
    if (store.storeName.trim() === "") {
      toast.error("Store Name is Required");
      return;
    }
    if (store.storeLocation.trim() === "") {
      toast.error("Store Address is Required");
      return;
    }
    if (store.storedesc.trim() === "") {
      toast.error("Store Description is Required");
      return;
    }
    



    if (store.category.trim() === "") {
      toast.error("Store category is Required");
      return;
    }
    // if (store.openday.trim() === "") {
    //   toast.error("Store Available Days is Required");
    //   return;
    // }
   
    addStoreDetails(store, token)
      .then((res) => {
        console.log(res.data.storeId);
        uploadStoreImage(res.data.storeId, imageFile, token)

          .then((data) => {
console.log(res.data.storeId)
            toast.success("Image uploaded");
          })
          .catch((error) => {
            toast.error("error in uploading image");
            console.log(error);
          });

        toast.success("Store Details Uploaded");
        console.log(store);
        setStore({
            storeName: "",
            storeLocation: "",
          category:"",
          storedesc: "",
   
          openday: "",
         
        
        });
      })
      .catch((error) => {
        toast.error("Store Details not  Uploaded due to some error !! ");
        console.log(error);
      });
  };


  useEffect (()=>{
    const token =localStorage.getItem("token")
    async function fetchdata(){
      const data=await getAllStoreManager(token)
      setStoremanager(data)
    }
    fetchdata();
  },[]
  );
  






  
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
                    onChange={fieldChanged}
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
                  />
                </div>

                <div className="form-group   m-3 ">
                  <label className="font-bold" htmlFor="category">
                    Store Category:
                  </label>
                  <select
                    id="category"
                    name="category"
                    onChange={fieldChanged}
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
                    onChange={fieldChanged}
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
                      onChange={fieldChanged}
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
                      onChange={fieldChanged}
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
{/* select storemanager */}
<div className="form-group mb-1 m-3">
  <label className="font-bold" htmlFor="availableDays">
    StoreManager:
  </label>
  <Select
    value={setSelectedStorManager}
    onChange={fieldChanged}
    displayEmpty
    inputProps={{ 'aria-label': 'Select Rider' }}
    className="form-control block w-full p-2 py-1.5 text-base text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none required" >
    <MenuItem value="" disabled>
      Select StoreManager
    </MenuItem>
    { storemanager.map((rider:any) => (
      <MenuItem key={rider.id} value={rider.id}>
        {rider.name}
      </MenuItem>
    ))}
  </Select>
</div>











                <div className="form-group mb-1 m-3">
                  <label className="font-bold" htmlFor="storeLocation">
                    Store Address:
                  </label>
                  <input
                    type="text"
                    id="storeLocation"
                    name="storeLocation"
                    onChange={fieldChanged}
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
                    onChange={fieldChanged}
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

export default AddStore;

