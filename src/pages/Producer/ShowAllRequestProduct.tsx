import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductRequest,acceptProductRequest } from '../../service/RequestService';

interface Request {
  id: number;
  quantity: number;
  status: string;
  deliveryAddress: string;
  deliveryNumber: string;
  phoneNumber: string;
  receiverName: string;
  deliveryDate: Date;
  product: {
    id: number;
    name: string;
    imageUrl: string;
    store: {
      id: number;
      name: string;
      storeManager: {
        id: number;
        name: string;
      };
    };
  };
}
interface StoreManager {
  id: number;
  name: string;
}

const RequestList = () => {
  const { productId } = useParams();
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    getProductRequest(productId, token)
      .then((data) => {
        let acceptreq=data.data.filter((req:any)=>req.status === "PENDING")
        setRequests(acceptreq);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productId]);
  
  const handleAcceptRequest = (requestId:any) => {
    const token = localStorage.getItem('token');
    acceptProductRequest(requestId, token)
      .then(() => {
        // update the status of the request in the UI
        setRequests((prevRequests) => {
          const updatedRequests = [...prevRequests];
          const index = updatedRequests.findIndex((request) => request.id === requestId);
          updatedRequests[index].status = 'Accepted';
          return updatedRequests;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };




  return (
    <div className='pt-5'>
      {requests.map((request) => (
        <div className="card-body pt-5">
          <h5 className="card-title">{request?.product?.name}</h5>
          <img src={request.product.imageUrl} alt={request?.product?.name} />
          <p className='card-text'>
      
          Store Manager: {request?.product?.store.storeManager.name}

          </p>
          <button onClick={() => handleAcceptRequest(request.id)}>Accept Request</button>
        </div>
      ))}
    </div>
  );
};
export default RequestList;