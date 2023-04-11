
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
import { deleteProducts, getAllProducteveryone } from '../../service/ProductService';
import { getPersonalProfile } from '../../service/ProfileService';
import filteringProduct from '../../Utils/filteringProduct';

type Props = {
  role: String;
};

const Product = (props: Props) => {
    const { role } = props;
  
    const [allProducts, setAllProducts] = useState<any>();
    const [products, setProducts] = useState<any>();
    const token: any = localStorage.getItem("token");
  
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
                          <Grid item lg={2} md={4}  xs={6}>
                            <Card elevation={10}>
                              <Box
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                                pt={1}
                              >
                                <CardMedia
                                  component="img"
                                  alt="Not Uploaded"
                                  style={{
                                    backgroundSize: "cover",
                                    height: "200px",
                                    width: "90%",
                                  }}
                                  image={
                                    "http://localhost:3000/api/v1/producer/product/image/" + product.image
                                  }
                                />
                              </Box>
                              <CardContent>
                                <Typography gutterBottom>
                                  <div className="md:text-xl">
                                    <span className="font-bold">Category</span>:{" "}
                                    {product.category}
                                  </div>
                                </Typography>
                                <Typography
                                  className="text-xl"
                                  color="text.secondary"
                                >
                                  <h2>{product.productName}</h2>
                                  <h3> {product.status}</h3>
                                </Typography>
                              </CardContent>
                              <CardActions
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  flexWrap: "wrap",
                                }}
                              >
                              
  
                                
  
                               
                                    <Link
                                      to={"/employee/product-details/" + product.productId}
                                    >
                                      <button className=" bg-green-700 md:py-2 py-1 hover:bg-green-600  w-[60px] border hover:border-black  text-white rounded-md mx-auto ">
                                        Details
                                      </button>
                                    </Link>
                                    <Link
                                      to={"/partner/update-product/" + product.productId}
                                    >
                                      <button className=" bg-gray-700 md:py-2 py-1  hover:bg-gray-800 w-[80px] border hover:border-black  text-white rounded-md mx-auto ">
                                        Update
                                      </button>
                                    </Link>
  
                                    <button
                                      onClick={() => deleteProduct(product)}
                                      className=" bg-red-700 md:py-2 py-1 hover:bg-red-800 w-[60px] border hover:border-black  text-white rounded-md mx-auto "
                                    >
                                      <DeleteIcon />
                                    </button>
                               
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
  
export default Product