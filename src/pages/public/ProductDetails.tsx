import React, { useState, useEffect } from "react";
import { getProductById } from "../../service/ProductService";
import { useParams } from 'react-router-dom';
import { Button, CardMedia, TextField, Typography ,Grid} from "@mui/material";

 
interface Product {
  productId: number;
  productName: string;
  description: string;
  image: string;
  price: number;
  producer: User;
  storeManager: User;
}

interface User {
  user_id: number;
  name: string;
  store: {
    storeId: number;
    storeName: string;
  }
}

  

type Props = {
    role: string;
 
  };


  const ProductDetails = (props: Props) => {
    const [product, setProduct] = useState<Product | null>(null);
    const { productId } = useParams();
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem("token");
     
          if (!token) {
            // handle case where user is not logged in
            return;
          }
          const result = await getProductById(productId,token);
          setProduct(result.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, []);
  
    if (!product) {
      return <p>Loading...</p>;
    }
  
    return (
<div className="container mx-auto">
  <div className="shadow-slate-100">
    {product ? (
      <Grid container spacing={1} className="">
        <Grid item xs={1} sm={1} md={2} lg={1}></Grid>
        <Grid item xs={4} sm={3} md={4} lg={4}>
          <CardMedia
            component="img"
            alt="Product Image"
            style={{
              backgroundSize: "cover",
              height: "300px",
              width: "100%",
            }}
            image={`http://localhost:3000/api/v1/producer/product/image/${product.image}`}
          />
        </Grid>
        <Grid item xs={1} sm={1} md={1} lg={1}></Grid>
        <Grid item xs={5} sm={5} md={5} lg={5}>
          <div className="ml-10 pl-8 mt-10">
            <Typography variant="h4" component="h1" gutterBottom>
              {product.productName}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {product.description}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Price: {product.price}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Producer: {product.producer.name}
            </Typography>
            <div className="flex flex-col sm:flex-row mt-4">
              <Button variant="contained" color="primary" className="mr-2">
                Order now
              </Button>
              <Button variant="outlined" color="primary" className="ggdfc">
                Add to cart
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    ) : (
      <p>Loading...</p>
    )}
  </div>
</div>

    );
  
  }
  
  export default ProductDetails;
