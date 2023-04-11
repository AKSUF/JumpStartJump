import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {getAllStoreProduct} from"../../service/StoreService"
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Avatar, Select } from '@material-ui/core';

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
const ShowProductStafStore=()=>{
    const [storeProduct, setStoreProduct] = useState<StoreProduct[]>([]);
    const { storeproductId } = useParams();

    useEffect(() => {
      const token = localStorage.getItem('token');
      getAllStoreProduct(token)
        .then((data) => {
          setStoreProduct(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
    
      
    
  if (!storeProduct) {
    return <p>Loading...</p>;
  }


return(
<div>

<Table>
<TableHead>
    <TableRow>
<TableCell>storeproductId</TableCell>
<TableCell>productId</TableCell>
<TableCell>productName</TableCell>
<TableCell>image</TableCell>
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
<TableCell> <img src={`http://localhost:3000/api/v1/producer/product/image/${request.product.image}`} alt="Not Uploaded" style={{ maxHeight: "75px", maxWidth: "75px" }} /></TableCell>
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
export default ShowProductStafStore


