import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductRequest,acceptProductRequest } from '../../service/RequestService';
import { getAllOrders,getAllRiders,getAllOrdersForDeliveryman,acceptDeliveryRequest } from '../../service/deliveryService';
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Avatar, Select } from '@material-ui/core';
import {assignDeliveryman} from '../../service/deliveryService';
import { MenuItem } from '@mui/material';

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
    deliveryman: User;

}



interface User {
  user_id: number;
  name: string;
  profile_image: String;

}





type Props = {
    role: String;
  };

const CustomerConfirmation = (props: Props) => {
    const [orders, setOrders] = useState([]);
    const [riders, setRiders] = useState<any>([]);
    const [selectedRider, setSelectedRider] = useState<any>([]);

    const [deliverymanId, setDeliverymanId] = useState('');
    const { deliveryId } = useParams();
  



    useEffect(() => {
      const token = localStorage.getItem('token');
      async function fetchData() {
        const data = await getAllOrdersForDeliveryman (token);
        setOrders(data);
      }
      fetchData();
    }, []);



  
useEffect (()=>{
  const token =localStorage.getItem("token")
  async function fetchdata(){
    const data=await getAllRiders(token)
setRiders(data)
  }
  fetchdata();
},[]
);

const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  setSelectedRider(event.target.value as string);
};

const getDeliverymanEmail = (deliverymanId: number): string => {
  const deliveryman = riders.find((d: User) => d.user_id === deliverymanId);
  if (deliveryman && deliveryman?.name) {
    return deliveryman.name;
  } else {
    return '';
  }
};

const filteredOrders = selectedRider ? orders?.filter((order: Delivery) => order.deliveryman && order.deliveryman.user_id.toString() === selectedRider) : orders;




function getUserById(users: User[], id: number) {
  return users.find(user => user.user_id === id);
}

const handleFormSubmit = async (event:any) => {
  event.preventDefault(); // prevent default form submission
  const token = localStorage.getItem('token');

  try {
    if (riders.length === 0) {
      throw new Error('No riders found');
    }
    const selectedUser = riders.find((user: User) => user.user_id === selectedRider);
    if (!selectedUser) {
      throw new Error('Selected rider not found');
    }
    const response = await assignDeliveryman(deliveryId, selectedUser.user_id, token);
    // do something with the response, e.g. show a success message
  } catch (error) {
    // handle error, e.g. show an error message
    console.log(error);
  }
}

const handleAcceptRequest = (deliveryId:any) => {
  const token = localStorage.getItem('token');
  acceptDeliveryRequest(deliveryId, token)
    .then(() => {
      console.log("this mhjhhgghjj")
      // update the status of the request in the UI
    
    })
    .catch((error) => {
      console.log(error);
    });
};





  return (
    <>
    <div style={{ marginBottom: '20px' }}>
 
  </div>

    <Table>
    <TableHead>
      <TableRow>
        <TableCell>Delivery ID</TableCell>
        <TableCell>Delivery Address</TableCell>
        <TableCell>Delivery Number</TableCell>
        <TableCell>Delivery Status</TableCell>
        <TableCell>Product Name</TableCell>
        <TableCell>Product Image</TableCell>
        <TableCell>Quantity</TableCell>
        <TableCell>Price</TableCell>
        <TableCell>My Name Name</TableCell>
        <TableCell>Customer Image</TableCell>
        <TableCell>Accept</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
    {orders && orders.map((order:any) => (
        <TableRow key={order?.deliverId}>
          <TableCell>{order?.deliverId}</TableCell>
          <TableCell>{order?.address}</TableCell>
          <TableCell>{order?.delivery_number}</TableCell>

         

          <TableCell>{order?.status}</TableCell>
          <TableCell>
          {order?.product?.productName}
            </TableCell>
          <TableCell>
            <Avatar src={order?.product?.image} alt={order?.product?.productName} />
          </TableCell>
          <TableCell>{order.quantity}</TableCell>
          <TableCell>{order.totalPrice}</TableCell>
          <TableCell>
            {order?.customer?.name}
            </TableCell>
          <TableCell>
            <Avatar src={order?.customer?.profile_image} alt={order?.customer?.name} />
          </TableCell>
          <TableCell>
          <Button className="accept-button ml-5" onClick={() => handleAcceptRequest(order.deliverId)}>Accept Request</Button>
          </TableCell>
          <TableCell>
  <form onSubmit={handleFormSubmit}>
    <div className='flex'>
      <div>
  
      </div>
      <div>
        <Button type="submit">
          <i className="fas fa-arrow-right"></i>
        </Button>
      </div>
    </div>
  </form>
</TableCell>

          
        </TableRow>
      ))}
    </TableBody>
  </Table>
</>
  );
};
export default CustomerConfirmation;