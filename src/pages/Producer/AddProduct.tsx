import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addStoreDetails, showAllStore } from "../../service/StoreService";
import { addProductDetails, uploadProductImage } from "../../service/ProductService";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

const AddProduct = () => {
  const token = localStorage.getItem("token");
  const [imageFile, setImageFile] = useState();
  const [stores, setStores] = useState([]);


  const [product, setProduct] = useState({
    productName: "",
    productdesc: "",
    price: "",
    category: "",
    storeId: "",
   
  });
  const fieldChanged = (event: any) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
    console.log(product);
  };
  useEffect(() => {
    showAllStore(token)
      .then((res) => {
        setStores(res.data);
        console.log(res.data);

        return;
      })
      .catch((error) => {
        toast.error("Error While Fetching, Please retry later!");
      });
  }, []);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (
      product.productName.length <= 1 ||
      product.price.length <= 0 ||
      product.productdesc.length <= 5
   
    ) {
      toast.error("Please fill in all required Data");
      return;
    }
    if (product.productName.trim() === "") {
      toast.error("Store Name is Required");
      return;
    }
    if (product.productdesc.trim() === "") {
      toast.error("Store Address is Required");
      return;
    }
    if (product.category.trim() === "") {
      toast.error("Store Description is Required");
      return;
    }

    if (product.price.trim() === "") {
      toast.error("Store price is Required");
      return;
    }
  

    addProductDetails(product, token)
      .then((res) => {
        console.log(res.data.productId);
        uploadProductImage(res.data.productId, imageFile, token)
          .then((res) => {
            toast.success("Image uploaded");
          })
          .catch((error) => {
            toast.error("error in uploading image");
            console.log(error);
          });

        toast.success("Product Details Uploaded");
        console.log(product);
        setProduct({
          productName: "",
          productdesc: "",
          price: "",
          category: "",
          storeId: "",
         
        });
      })
      .catch((error) => {
        toast.error("Product Details not  Uploaded due to some error !! ");
        console.log(error);
      });
  };
  // handling file change image
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
                Add Product Details
              </div>
              <hr></hr>

              <form onSubmit={handleSubmit}>
                <div className="form-group   m-3 ">
                  <label className="font-bold" htmlFor="productName">
                    Product Name:
                  </label>
                  <input
                    type="text"
                    id="productName"
                    name="productName"
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
                  <label className="font-bold" htmlFor="storeId">
                    Store Name:
                  </label>
                  <select
                    id="store"
                    name="storeId"
                    onChange={fieldChanged}
                    defaultValue={0}
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
                    <option>--Select category--</option>

                    {stores?.map((store: any) => (
                      <option value={store?.storeId} key={store?.storeId}>{store?.storeName}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group   m-3 ">
                  <label className="font-bold" htmlFor="category">
                    Product Category:
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
                    <option className=" font-bold">Makeup</option>
                    <option className=" font-bold ">Grocery</option>
                    <option className=" font-bold ">Electronic</option>
                    <option className=" font-bold ">Fruit</option>
                    <option className=" font-bold ">Flower shop</option>
                    <option className=" font-bold ">Machinery</option>
                    <option className=" font-bold ">Book Shop</option>
                    <option className=" font-bold ">Furniture Shop</option>
                    <option className=" font-bold ">Toys Shop</option>
                  </select>
                </div>

                <div className="form-group mb-1 m-3 w-6/12">
                  <label className="font-bold" htmlFor="price">
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
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
                    <label htmlFor="image" className="fw-bold">
                      Select Image
                    </label>
                    <div>
                      <input
                        id="image"
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
                  <label className="font-bold" htmlFor="productdesc">
                    Store Description:
                  </label>
                  <textarea
                    id="productdesc"
                    name="productdesc"
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
                  <button
                    onClick={(e) => handleSubmit(e)}
                    className="  bg-sky-800 mt-2 mb-5 py-2 font-bold  hover:bg-sky-700  700   w-10/12   text-white rounded-md  "
                  >
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

export default AddProduct;
