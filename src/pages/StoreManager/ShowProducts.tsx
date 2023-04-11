
import React, { useEffect, useState } from 'react'

import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteProducts, getAllProducts,getAllProducteveryone } from '../../service/ProductService';
import { getPersonalProfile } from '../../service/ProfileService';
import filteringProduct from '../../Utils/filteringProduct';
import {sendProductRequest} from '../../service/RequestService'
import {incrementRequestQuantity } from "../../service/RequestService";


type Props={
    role:String;
}


  
const ShowProduct = (props: Props) => {

   
  
    const [allProducts, setAllProducts] = useState<any>();
    const [products, setProducts] = useState<any>();
 
const[request,setRequest]= useState<any>();
    const token: any = localStorage.getItem("token");
    const [quantity, setQuantity] = useState(1);
  

    
    useEffect(() => {
      getPersonalProfile(token)
        .then((res) => {
          console.log(res.data);
  
          getAllProducteveryone(token)
            .then((res) => {
              setProducts(res.data);
              setAllProducts(res.data);
              return;
            })
            .catch((error) => {
              toast.error("Error While Fetching, Please retry later!");
            });
        })
        .catch((error) => {
          toast.error("Error While Fetching, Please retry later!");
        });
    }, []);
  

    function handleIncrementRequest(request: any) {
      incrementRequestQuantity(request.requestId, token)
        .then((data) => {
          console.log(data);
          // do something with the returned data
        })
        .catch((error) => {
          console.log(error);
          // handle the error
        });
      
    }

  function decrementRequestQuantity(request: any) {
      incrementRequestQuantity(request.requestId, token)
        .then((data) => {
          console.log(data);
          // do something with the returned data
        })
        .catch((error) => {
          console.log(error);
          // handle the error
        });
    }




    const filterProduct = (e: React.ChangeEvent<HTMLSelectElement>) => {
        filteringProduct(e, setProducts, allProducts);
    };
    function deleteProduct(product: any) {
      if (window.confirm("Are you sure")) {
        deleteProducts(product.productId, token)
          .then((data) => {
            toast.success("Meal Details is delete");
            let newProductContent = products.filter((p: any) => p.productId != product.productId);
            setProducts([...newProductContent]);
          })
          .catch((error) => {
            console.log(error);
            toast.error("Error in deleting post");
          });
      }
    }

    function handleSendRequest(product:any) {
     
      sendProductRequest(product.productId,token)
        .then((response) => {
       
          toast.success("Request sent to producer");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error sending request");
        });
    }
 
  
    

  






  
    return (
        <div className="sm:m-4 ">
        <div className="mb-10">
          <Container maxWidth="xl">
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Box pb={6}>
                  <FormControl className="w-[200px] ">
                    <InputLabel
                      className="text-xl"
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      Product Type
                    </InputLabel>
                    <NativeSelect
                      defaultValue={"all"}
                      inputProps={{
                        name: "age",
                        id: "uncontrolled-native",
                      }}
                      onChange={(e) => filterProduct(e)}
                    >
                      <option value={"all"}>All</option>
                      <option value={"Bag"}>Bag</option>
                      <option value={"Makeup"}>Makeup</option>
                    </NativeSelect>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box p={1}>
                  <Grid container spacing={1}>
                    {products != undefined
                      ? products.map((product: any, index: any) => (
                          <Grid item lg={4} md={6} xs={6}>
                            <Card elevation={10}>
                            <Box
      style={{
        display: "flex",
        justifyContent: "center",
        height: "200px",
        backgroundImage: `url(http://localhost:3000/api/v1/producer/product/image/${product.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
          <h3> {product.status}</h3>
    </Box>
                              <CardContent>
                                <Typography gutterBottom>
                                  <div
                                    className=""
                                    style={{ textAlign: "center",fontSize: "15px" }}
                                  >
                                   
                                  </div>
                                </Typography>
                                <Typography className="text-xl" color="text.secondary">
                                  <div style={{ textAlign: "center" }}>
                                    <h2>{product.producerId}</h2>
                                  
                                    <h3> €{product.price}</h3>
                                  </div>
                                </Typography>
                                <div className="mt-2">
     
                                

<Grid container spacing={2}>
  <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
    {/* Content */}
  </Grid>
  <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
  <div className="items-center flex ml-2">

  {request !== undefined && (
        <div>
          <button
            onClick={() => handleIncrementRequest(request.requestId)}
            className="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 12H4"
              />
            </svg>
          </button>
          <div className="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none">
            {request.quantity}
          </div>
          <button
            onClick={() => decrementRequestQuantity(request.requestId)}
            className="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      )}   

  </div>

  </Grid>
  <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
    {/* Content */}
  </Grid>
  {/* Add more Grid items as needed */}
</Grid>

      
    </div>
   

    <Link to={`storemanager/showproducts/${product.productId}`}>

    <button 
          className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 mt-4 w-full flex items-center justify-center"
         
        >
          Send Request
        </button>
        </Link>




                              </CardContent>
                              <CardActions
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  flexWrap: "wrap",
                                }}
                              >
                                <Link to={"/employee/product-details/" + product.productId}>
                                  <button className=" bg-green-700 md:py-2 py-1 hover:bg-green-600  w-[60px] border hover:border-black  text-white rounded-md mx-auto ">
                                    Details
                                  </button>
                                </Link>
                                <Link to={"/partner/update-product/" + product.productId}>
                                  <button className=" bg-gray-700 md:py-2 py-1  hover:bg-gray-800 w-[80px] border hover:border-black  text-white rounded-md mx-auto ">
                                 Store
                                  </button>
                                </Link>
                             
                              </CardActions>
                            </Card>
                          </Grid>
                        ))
                      : ""}
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Container>
       
      
        </div>
        {/* </Container> */}
      </div>
    );
  };
  
export default ShowProduct