
import React, { useEffect, useState } from 'react'
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
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
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteProducts, getAllProducts } from '../../service/ProductService';
import { getPersonalProfile } from '../../service/ProfileService';
import filteringProduct from '../../Utils/filteringProduct';
import { addProductToCart } from "../../service/CarService";

import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";

type Props = {
  role: String;
};

const ProductAll = (props: Props) => {
    const { role } = props;
    const [hoverEffects , setHoverEffects]=useState(' opacity-0')
    const iconStyle = 'h-[40px] w-[40px] rounded-full bg-white flex items-center justify-center m-3 hover:bg-[#894af3] hover:text-white hover:scale-[1.1] ease-in duration-100 cursor-pointer'
    function handleHoverEnter(){
        setHoverEffects('opacity-1 bg-[rgba(0,0,0.2)')
    }
    function handleHoverExit(){
        setHoverEffects('opacity-0')
    }

   
  



    const [allProducts, setAllProducts] = useState<any>();
    const [products, setProducts] = useState<any>();
  
    const token: any = localStorage.getItem("token");

    const handleAddToCart = async (productId: number) => {
      try {
        const cartItemData = { quantity: 1 };
        const response = await addProductToCart(productId, cartItemData, token);
        console.log("Cart item added:", response.data);
      } catch (error) {
        console.log("Error adding to cart:", error);
      }
    };




  
    useEffect(() => {
      getPersonalProfile(token)
        .then((res) => {
          console.log(res.data);
  
          getAllProducts(token)
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
        <div className="">
      
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

                <div>


                  
                <Box p={1}>
             
                  <Grid container spacing={1}>




                    {products != undefined
                      ? products.map((product: any, index: any) => (
                          <Grid item lg={3} md={5}  xs={7}>
                            <Card elevation={10} className="bg-gray-50   text-red-800">
                              <Box
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                                pt={1}
                              >
                                <CardMedia
                                  component="img"
                                  alt="Image is not uploaded"
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
                                 
                                </Typography>
                                <Typography
                                  className="text-xl"
                                  color="text.secondary"
                                >
                                  <h2>{product.productName}</h2>
                                  
                                </Typography>
                              </CardContent>
                              <CardActions
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  flexWrap: "wrap",
                                }}
                              >
                           <div className='flex'>
                           <Link to={`productdetails/product/${product.productId}`}>
                           <button  className="mr-2 text-red-800"> <ContentPasteSearchIcon className='h-75px inline-block text-4xl' style={{ fontSize: '40px' }}/></button>
                     </Link>
                              
                                <button onClick={() => handleAddToCart(product.productId)} className="ml-2  text-red-800" >
  <AddShoppingCartIcon  className='h-75px inline-block text-4xl' style={{ fontSize: '40px' }}/></button>
                           </div>

                               
                              </CardActions>
                            </Card>
                          </Grid>
                        ))
                      : ""}
                  </Grid>
                  <div className={`flex items-center justify-center absolute w-[100%] h-[100%] ease-in duration-100` + hoverEffects}>
          <div className={iconStyle}>
            <ShoppingCartOutlined />
          </div>
          <div className={iconStyle}>
            <FavoriteBorderOutlined />
          </div>
          <div className={iconStyle}>
            <SearchOutlined />
          </div>
        </div>
                 
                </Box>
                </div>
              </Grid>
              
            </Grid>
          </Container>
        </div>
        {/* </Container> */}
      </div>
    );
  };
  
export default  ProductAll