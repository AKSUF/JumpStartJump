import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {getAllProductStore} from"../../service/StoreService"
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Avatar, Select, CardMedia } from '@material-ui/core';
import { Link } from "react-router-dom";
interface StoreProduct{
    storeproductId:number;
    store:{
        storeId:number;
        storeName:string;
        storeImage:string;
        catagory:string;
    }
    product: {
        productId: number;
        productName: string;
        image:string;
        
      };
    
}
const ShowStoreProduct=()=>{
    const [storeProduct, setStoreProduct] = useState<StoreProduct[]>([]);
    const { storeproductId } = useParams();

   
    useEffect(() => {
      const token = localStorage.getItem('token');
      getAllProductStore(token)
        .then((data) => {
          setStoreProduct(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
    
      

return(
<div>

<Table>
<TableHead>
    <TableRow>

<TableCell>productId</TableCell>
<TableCell>productName</TableCell>
<TableCell>image</TableCell>
<TableCell>Action</TableCell>
<TableCell>storeId</TableCell>
<TableCell>storeName</TableCell>
<TableCell>storeImage</TableCell>
    </TableRow>
</TableHead>
<TableBody>
{storeProduct.map((request) => (
    <TableRow key={request.storeproductId}>
<TableCell>{request.product.productId}</TableCell>
<TableCell>{request.product.productName}</TableCell>

<TableCell>
  <img src={`http://localhost:3000/api/v1/producer/product/image/${request.product.image}`} alt="Not Uploaded" style={{ maxHeight: "75px", maxWidth: "75px" }} />
</TableCell>

<TableCell>
  <p className='pb-2'>
            <Link to={`productedit/product/${request.product.productId}`}>
                         


            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Update
</button>
                     </Link>
                              
    
  </p>
<p><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
  Delete
</button></p>


</TableCell>
<TableCell>{request.store.storeId}</TableCell>
<TableCell>{request.store.storeName}</TableCell>
<TableCell>{request.store.storeImage}</TableCell>


</TableRow>


      ))}
</TableBody>



</Table>



</div>
)
}
export default ShowStoreProduct

