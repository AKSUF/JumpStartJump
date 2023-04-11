import React from "react";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import HomeIcon from "@mui/icons-material/Home";
import StorefrontIcon from '@mui/icons-material/Storefront';
import InfoIcon from "@mui/icons-material/Info";
import ContactsIcon from "@mui/icons-material/Contacts";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import AddBoxIcon from '@mui/icons-material/AddBox';

import { NavLink } from "react-router-dom";
import { SearchOutlined } from "@mui/icons-material";
import MenuProfile from "../Layout/Navbar/MenuProfile";




type Props={role:String}

const CustomerDash =  (props:Props) => {
  const{role}=props;
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };

  const [showOption, setShowOption] = useState(false);
  const handleClick = () => {
    setShowOption(!showOption);
  };
  return (
    <div className="lg:flex hidden ">
      <div className="   h-full w-full left-0 z-20">
          <div className="">
          </div>
          
            <ul className="p-4 uppercase text-left text-[16px] cursor-pointer font-bold text-black bg-gray-100">
            <li className="p-4 border-b border-gray-600 hover:border-gray-400 hover:text-green-400">
              <NavLink to="/customer/home">
                <HomeIcon className="inline-block mr-2 mb-2 " />
                Home 
              </NavLink>
            </li>
            <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 hover:text-green-400">
              <NavLink to="/customer/product">
                <StorefrontIcon className="inline-block ml-0 mr-2 mb-2  " />
                Product
              </NavLink>
            </li>
             <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 hover:text-green-400">
              <NavLink to="/customer/myOrder">
                <AddBoxIcon className="inline-block ml-0 mr-2 mb-2  " />
        MyOrder
              </NavLink>
            </li>
            <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 hover:text-green-400">
              <NavLink to="/customer/cart">
                <AddBoxIcon className="inline-block ml-0 mr-2 mb-2  " />
          MyCart
              </NavLink>
            </li>
            <li className="p-4 uppercase text-left text-[16px] cursor-pointer font-bold text-black bg-gray-100">
              <NavLink to="/customer/showProductStafStore">
                <HomeIcon className="inline-block mr-2 mb-2 " />
              OurStore
              </NavLink>
            </li>


            <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400hover:text-green-400">
              <NavLink to="/about-us">
                <InfoIcon className="inline-block ml-0 mr-2 mb-2 " />
                About Us
              </NavLink>
            </li>
            <li className="p-4 border-b border-gray-600 dark:hover:border-gray-40 hover:text-green-400">
              <NavLink to="/contact-us">
                <ContactsIcon className="inline-block ml-0 mr-2 mb-2  " />
                Contact Us
              </NavLink>
            </li>
            <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 hover:text-green-400">
              <NavLink to="/login">
                <LoginIcon className="inline-block ml-0 mr-2 mb-2  " />
                Login
              </NavLink>
            </li>
            <li className="p-4 border-gray-600 hover:border-b dark:hover:border-gray-400 hover:text-green-400">
              <NavLink to="/register">
                <AppRegistrationIcon className="inline-block ml-0 mr-2  " />
                Registration
              </NavLink>
            </li>
         
             
              
            </ul>
            
       
          {/* <div onClick={handleNav} className="block lg:hidden ">
            {!nav ? (
              <AiOutlineClose className="font-bold" size={25} />
            ) : (
              <AiOutlineMenu className="font-bold" size={25} />
            )}
          </div>
          <div
            className={
              !nav
                ? "fixed left-0 top-0 z-20 h-full  ease-in-out duration-500 bg-white shadow-md backdrop-filter backdrop-blur-lg bg-opacity-60 lg:hidden"
                : "fixed left-[-100%]"
            }
          >
            {" "}
            <div className="bg-white left-0 top-0 z-20 shadow-md backdrop-filter backdrop-blur-lg bg-opacity-60">
              <h1 className="w-full text-3xl font-bold m-4  cursor-pointer font-serif">
                Merry Meal
              </h1>
              <ul className="px-4  text-left text-1xl cursor-pointer  ">
                <li>
                  <div className=" items-center">
                    <div className="flex  rounded">
                      <input
                        type="text"
                        className="block w-full px-2 py-1  bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Search..."
                      />
                      <button className="px-4 text-white bg-gray-600 border-l rounded ">
                        Search
                      </button>
                    </div>
                  </div>
                </li>
              </ul>

             
                <ul className="p-4 uppercase text-left text-xl cursor-pointer font-bold ">
                  <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-700">
                    <NavLink to="/">
                      <HomeIcon className="inline-block mr-2 mb-2 text-green-400 " />
                      Home
                    </NavLink>
                  </li>
                  <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-700">
                    <NavLink to="/meals">
                      <RestaurantMenuIcon className="inline-block ml-0 mr-2 mb-2 text-green-400 " />
                      Meals
                    </NavLink>
                  </li>
                  <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-700">
                    <NavLink to="/about-us">
                      <InfoIcon className="inline-block ml-0 mr-2 mb-2 text-green-400 " />
                      About Us
                    </NavLink>
                  </li>
                  <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-700">
                    <NavLink to="/contact-us">
                      <ContactsIcon className="inline-block ml-0 mr-2 mb-2 text-green-400 " />
                      Contact Us
                    </NavLink>
                  </li>
                  <li className="p-4 border-b border-gray-600 dark:hover:border-gray-400 dark:hover:text-green-700">
                    <NavLink to="/login">
                      <LoginIcon className="inline-block ml-0 mr-2 mb-2 text-green-400 " />
                      Login
                    </NavLink>
                  </li>
                  <li className="p-4 border-gray-600 hover:border-b dark:hover:border-gray-400 dark:hover:text-green-700">
                    <NavLink to="/register">
                      <AppRegistrationIcon className="inline-block ml-0 mr-2 text-green-400 " />
                      Registration
                    </NavLink>
                  </li>
                </ul>
              
            </div>
          </div> */}
        </div>
    </div>
  );
}



export default CustomerDash;
