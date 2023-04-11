
import "./App.css";
import React, { useEffect } from "react";
import { useState } from "react";
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/public/Login";
import Registration from "./pages/public/Registration";
import PublicHome from "./components/For all users/PublicHome";
import Home from "./pages/public/Home";
import ProtectedRoute from "./components/security/ProtectedRoute";
import AddStore from "./pages/Admin/AddStore";
import "react-toastify/dist/ReactToastify.css";
import Stores from "./pages/Admin/ShowStore";
import Profile from "./pages/public/Profile";
import Dashboard from "./pages/Dashboard";
import UserHome from "./Customer/Customer";
import EditProfile from "./pages/public/Edit";
import CustomerDash from "./components/Dashboaard/Customer.Dashboard";
import AddProduct from "./pages/Producer/AddProduct"
import Product from "./pages/Producer/ShowProducts";
import ProductAll from "./pages/public/ShowAllproducts";
import CartItemList from "./pages/public/ShowCart";
import PaymentForm from "./pages/public/OrderProduct";
import ShowProduct from "./pages/StoreManager/ShowProducts";
import RequestForm from "./pages/StoreManager/RequestForm";
import RequestList from"./pages/Producer/ShowAllRequestProduct";
import RequestAllList from "./pages/Producer/ShowAllRequest";
import ShowAllAcceptedRequest from "./pages/StoreManager/ShowAcceptedRequest"
import ProductDetails from "./pages/public/ProductDetails";
import Productdetails from "./pages/public/ProductDetails";
import ShowRequest from "./pages/Manager/ShowRequest";
import DeliveryList from "./pages/Delivery/AllDeliverShow"
import CustomerConfirmation from "./pages/public/ResposeReceivedelivery";
import UserInfo from "./pages/Admin/UserInfo"
import EditUserProfile from  "./pages/Admin/EditUserInfo"
import Storedetails from"./pages/Admin/DetailsStore"
import UpdateStore from"./pages/Admin/UpdateStore"
import ShowStoreProduct from"./pages/StoreManager/ShowstoreProduct"
import ShowProductStafStore from "./pages/public/StoreProduct"
import ShowProductAdmin from"./pages/Admin/StoreProductAdmin"
import EditProduct from "./pages/public/EditProduct"
function App() {
  let roles: any = localStorage.getItem("authorization");
  let arrayRoles = roles ? JSON.parse(roles) : null;
  const [auth, setAuth] = useState({
    role: arrayRoles != null && arrayRoles.length > 0 ? arrayRoles : [],
  });
  useEffect(() => {
    setAuth({
      role: arrayRoles != null && arrayRoles.length > 0 ? arrayRoles : [],
    });
  }, []);


  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ToastContainer />
      <Routes>
     

      <Route path="/" element={<Home role={auth.role.length > 0 ? auth.role[0] : ""} />} >
          {" "}
          <Route index element={<PublicHome role={""}/>}></Route>
          <Route path={"login"} element={<Login auth={setAuth} />} />
          <Route path={"productll"} element={<ProductAll role={""}/>}></Route>
          <Route path={"register"} element={<Registration auth={setAuth} />} />
         
          <Route path={"creatProfile"} element={<EditProfile action="submit" />} ></Route>

        </Route>

        <Route path="/JumpStartJump" element={<Home role={auth.role.length > 0 ? auth.role[0] : ""} />} >
          {" "}
          <Route index element={<PublicHome role={""}/>}></Route>
          <Route path={"login"} element={<Login auth={setAuth} />} />
          <Route path={"productll"} element={<ProductAll role={""}/>}></Route>
          <Route path={"register"} element={<Registration auth={setAuth} />} />
         
          <Route path={"creatProfile"} element={<EditProfile action="submit" />} ></Route>

        </Route>

        <Route
          element={<ProtectedRoute isAllowed={auth.role?.includes("ADMIN")} />}
        >
          <Route path={"/admin"} element={<Dashboard role={"ADMIN"} />}>
          <Route index element={<UserHome role={"ADMIN"} />}></Route>
          <Route path={"home"} element={<UserHome  role={"ADMIN"} />}></Route>
          <Route path={"add-store"} element={<AddStore />}></Route>
          <Route path={"showProductStafStore"} element={<ShowProductStafStore />}></Route>
          <Route path={"product"} element={<Product role={"ADMIN"}/>}></Route>
          <Route path={"stores"} element={<Stores role={"ADMIN"}/>} />
          <Route path={"userInfo"} element={<UserInfo role={"ADMIN"}/>} />
          <Route path={"stores/Storedetails/store/:storeId"} element={<Storedetails/>}></Route>
          <Route path={"stores/StoredUpdate/store/:storeId"} element={<UpdateStore/>}></Route>
          <Route path={"profile"} element={<Profile role={"CUSTOMER"} />}
          

          
            ></Route>
          </Route>
        </Route>

        <Route
          element={<ProtectedRoute isAllowed={auth.role?.includes("CUSTOMER")} />}
        >
           
          <Route path={"/customer"} element={<Dashboard role={"CUSTOMER"} />}>
       
          <Route index element={<ProductAll role={"CUSTOMER"} />}></Route>
          <Route path={"home"} element={<UserHome  role={"CUSTOMER"} />}></Route>
          <Route path={"showProductStafStore"} element={<ShowProductStafStore />}></Route>
          <Route path={"cart/customer/product/:productId"} element={<PaymentForm />}></Route>
          <Route path={"myOrder"} element={<CustomerConfirmation role={"CUSTOMER"}  />}></Route>
          <Route path={"productdetails/product/:productId"} element={<Productdetails  role={"CUSTOMER"} />}></Route>
          <Route path={"add-store"} element={<AddStore />}></Route>
        
          <Route path={"cart"} element={<CartItemList role={"CUSTOMER"}/>} />
          <Route path={"profile"} element={<Profile role={"CUSTOMER"} />}
            ></Route>
          </Route>
        </Route>


        <Route
          element={<ProtectedRoute isAllowed={auth.role?.includes("STOREMANAGER")} />}
        >
          <Route path={"/storemanager"} element={<Dashboard role={"STOREMANAGER"} />}>
          <Route index element={<ShowAllAcceptedRequest role={"STOREMANAGER"} />}></Route>
          <Route path={"addProduct"} element={<AddProduct />}></Route>
          <Route path={"myStore"} element={<ShowStoreProduct />}></Route>
          <Route path={"myStore/productedit/product/:productId"} element={<EditProduct/>}></Route>
          <Route path={"home"} element={<UserHome  role={"STOREMANAGER"} />}></Route>
          <Route path={"showAllAcceptedRequest"} element={<ShowAllAcceptedRequest  role={"STOREMANAGER"} />}></Route>
          <Route path={"showproducts"} element={<ShowProduct  role={"STOREMANAGER"}   />}></Route>
          <Route path={"showproducts/storemanager/showproducts/:productId"} element={<RequestForm />}></Route>
          <Route path={"add-store"} element={<AddStore />}></Route>
          <Route path={"product"} element={<Product role={"STOREMANAGER"}/>}></Route>
          <Route path={"stores"} element={<Stores role={"STOREMANAGER"}/>} />
          <Route path={"profile"} element={<Profile role={"STOREMANAGER"} />}
            ></Route>
          </Route>
        </Route>

        <Route
          element={<ProtectedRoute isAllowed={auth.role?.includes("RIDER")} />}
        >
          <Route path={"/rider"} element={<Dashboard role={"RIDER"} />}>
          <Route index element={<DeliveryList  role={"RIDER"} />}></Route>
          <Route path={"home"} element={<UserHome  role={"RIDER"} />}></Route>
          <Route path={"add-store"} element={<AddStore />}></Route>
          <Route path={"stores"} element={<Stores role={"RIDER"}/>} />
          <Route path={"profile"} element={<Profile role={"RIDER"} />}
            ></Route>
          </Route>
        </Route>

        
        <Route
          element={<ProtectedRoute isAllowed={auth.role?.includes("PRODUCER")} />}
        >
          <Route path={"/producer"} element={<Dashboard role={"PRODUCER"} />}>
          <Route index element={<UserHome role={"PRODUCER"} />}></Route>
         <Route path={"product"} element={<Product role={"PRODUCER"}/>}></Route>
          <Route path={"product"} element={<UserHome  role={"PRODUCER"} />}></Route>
          <Route path={"viewProduct"} element={<AddStore />}></Route>
          <Route path={"showrequest"} element={<RequestAllList  role={"PRODUCER"} />}></Route>
          <Route path={"stores"} element={<Stores role={"PRODUCER"}/>} />
          <Route path={"add-product"} element={<AddProduct/>} />
          <Route path={"profile"} element={<Profile role={"PRODUCER"} />}
            ></Route>
          </Route>
        </Route>


    
        <Route
          element={<ProtectedRoute isAllowed={auth.role?.includes("MANAGER")} />}
        >
          <Route path={"/manager"} element={<Dashboard role={"MANAGER"} />}>
          <Route index element={<ShowRequest role={"MANAGER"} />}></Route>
       {/* //  <Route path={"product"} element={<ShowRequest role={"MANAGER"}/>}></Route> */}
       <Route path={"showProductStafStore"} element={<ShowProductStafStore />}></Route>
          <Route path={"product"} element={<UserHome  role={"PRODUCER"} />}></Route>
          <Route path={"viewProduct"} element={<AddStore />}></Route>
          <Route path={"showrequest"} element={<RequestAllList  role={"PRODUCER"} />}></Route>
          <Route path={"stores"} element={<Stores role={"PRODUCER"}/>} />
          <Route path={"product"} element={<Product role={"PRODUCER"}/>}></Route>
          <Route path={"add-product"} element={<AddProduct/>} />
          <Route path={"profile"} element={<Profile role={"PRODUCER"} />}
            ></Route>
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
