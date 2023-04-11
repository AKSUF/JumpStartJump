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
const ShowProductAdmin=()=>{
    const [storeProduct, setStoreProduct] = useState<StoreProduct[]>([]);
    const { storeproductId } = useParams();

    useEffect(() => {
        const token = localStorage.getItem('token');
        getAllStoreProduct( token)
       
          .catch((error) => {
            console.log(error);
          });
      }, [storeproductId]);
      
    
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
<TableCell>{request.product.image}</TableCell>
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
export default ShowProductAdmin


