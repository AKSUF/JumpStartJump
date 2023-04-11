import { useState, useEffect } from "react";
import { getAllRequests ,acceptProductRequest } from "../../service/RequestService";
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { Avatar, CardContent, CardHeader, CardMedia, Typography ,Button} from "@mui/material";
import {addProductToStore} from "../../service/StoreService"
interface Request {
  requestId: number;
  quantity: number;
  description: string;
  status: string;
  product: {
    productId: number;
    productName: string;
    image: string;
  };
  producer: User;
  storeManager: User;
}

interface User {
  user_id: number;
  name: string;
  stores: {
    storeId: number;
    storeName: string;
  };
}
 

type Props = {
  role: String;
};

const RequestAllList = (props: Props) => {
  const { role } = props;
  const [data, setData] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [requests, setRequests] = useState<Request[]>([]);
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await getAllRequests(token);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        // setError(error.message);
      }
    };
    fetchRequests();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }


  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      maxWidth: '100%',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));

  const handleSaveProduct = (request:any) => {
    const token = localStorage.getItem('token');
    const storeManagerId = request.storeManager.storeManagerId;
    const storeId = request.storeManager?.stores?.storeId;
    const productId = request.product.productId;
    const requestId = request.requestId;
  const requestProductDto={}
    addProductToStore( productId,storeId, requestProductDto, requestId, token)
      .then(() => {
       
      })
      .catch((error) => {
        console.log(error);
      });
  }
  



  

  return (
    <div>
<Grid container spacing={2}>
      <Grid item xs={1} sm={4}>
        {/* Content for first column goes here */}
      </Grid>
      <Grid item xs={10} sm={6}>
      {data.map((request) => (
         <Card className="mt-5 flex">
           <div className="card-container">
        
             <div className="details-container">
               <CardContent>
                <h2 className="pl-10 ">{request.status} REQUEST</h2>
                 <Typography variant="body2" color="textSecondary" component="p">

                 <div className="pt-5">Accepted by: {request.storeManager?.name}</div>
              
                 </Typography>
                 <Typography variant="h2" component="h2">

                   {request.product?.productName}
                 </Typography>
                 <Typography variant="body2" color="textSecondary" component="p">
                   <div>{request.description}</div>
               
                 </Typography>
               </CardContent>
             </div>
             <div className="button-container place-content-end pt-10 mt-10 ml-10">
             <Button className="accept-button ml-5">
              
              
              </Button>
             <Button className="save-product-button" onClick={() => handleSaveProduct(request)}>Save in Store</Button>
             <Button className="details-button">Details</Button>
          
           </div>
           </div>
        
         
           <div className="image-container ml-10">
           <CardMedia
            component="img"
            alt="Product Image"
            style={{
              backgroundSize: "cover",
              height: "300px",
              width: "100%",
            }}
            image={`http://localhost:3000/api/v1/producer/product/image/${request.product?.image}`}
          />
             </div>
        
         </Card>
    
          ))}
    
      </Grid>
      <Grid item xs={1} sm={4}>
        {/* Content for third column goes here */}
      </Grid>
    </Grid>
    
    

   
    </div>
  );
};

export default RequestAllList;
