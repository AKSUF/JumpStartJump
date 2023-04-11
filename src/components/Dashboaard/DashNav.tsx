import React from "react";
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import HomeIcon from "@mui/icons-material/Home";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import InfoIcon from "@mui/icons-material/Info";
import ContactsIcon from "@mui/icons-material/Contacts";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";

import SearchIcon from '@mui/icons-material/Search';
import BadgeIcon from '@mui/icons-material/Badge';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { NavLink } from "react-router-dom";
import { SearchOutlined } from "@mui/icons-material";
import MenuProfile from "../Layout/Navbar/MenuProfile";
type Props = {
  role: String;
};
const DashNav =  (props: Props) => {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };
  const { role } = props;

  const [showOption, setShowOption] = useState(false);
  const handleClick = () => {
    setShowOption(!showOption);
  };
  const style =
    'text-[14px], cursor-pointer, ml-[25px] mobile:ml-[5px]';


  return (
    <div>
    
    <div className="navbar h-[60px] shadow-md relative z-10 bg-gray-100 hover:bg-gray-100 ">
      <div className="wrapper pl-[20px] pr-[20px] pt-[10px] pb-[25px] flex justify-between items-center mobile:pl-0 mobile:pr-0">


          <div className=" left flex flex-1  items-center">
            <div className="cursor-pointer text-[16px] mobile:hidden pr-10">
            JumpStart
            </div>

          
            <NavLink to="/">
            <div><h1>Home</h1></div>
            </NavLink>
            <NavLink to="/register">
              <div className={style}>Products</div>
                  </NavLink>

                  {/* <NavLink to="/register">
              <div className={style}> Register</div>
                  </NavLink>

                  <NavLink to="/login">
              <div className={style}>Login</div>
                  </NavLink> */}



          </div>


          {/* Logo */}
          <div className="center flex-1 text-center  mobile:ml-6">
          <NavLink to="/">
              <div className = "logo font-bold mobile:text-sm"></div>
              </NavLink>
          </div>

          {/* Right Side */}
          <div className="right flex flex-1 items-center justify-end mobile:justify-center mobile:flex-[2]">
            
  {/* Search Input */}
  <div className="SearchContainer flex border-[2px] border-solid border-lightgrey rounded-md items-center ml-[10px] p-[5px] hover:text-red-500">
                <input type='text' className="border-none mobile:w-[50px]" placeholder="Search"/>
                <SearchIcon className="text-[#8a4af3] m" style={{fontSize: '16px'}}/>
            </div>



              <NavLink to="/cart">
              <div className={style}>
              
                  <AddShoppingCartIcon/>
               
              
              </div>
              </NavLink>
      <MenuProfile role={role} />


            <div onClick={handleNav} className="block lg:hidden ">
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
                : "fixed left-[-200%]"
            }
          >
            {" "}
            <div className="bg-red-800 left-0 top-0 z-20 shadow-md backdrop-filter backdrop-blur-lg bg-opacity-60">
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
          </div>

      </div>
    </div>
      </div>
           
    </div>
  );
};


export default DashNav