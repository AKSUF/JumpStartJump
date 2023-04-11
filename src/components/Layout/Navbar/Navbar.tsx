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
// type Props = {
//   role: String;
// };
const Navbar = () => {
  const style =
  'text-[14px], cursor-pointer, ml-[25px] mobile:ml-[5px]';
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };
//   const { role } = props;

  const [showOption, setShowOption] = useState(false);
  const handleClick = () => {
    setShowOption(!showOption);
  };
  return (
  

    <div className="navbar h-[60px] shadow-sm relative z-10 font-serif  text-base leading-6">
      <div className="wrapper pl-[20px] pr-[20px] pt-[10px]  pb-[25px] flex justify-between  items-center mobile:pl-0 mobile:pr-0">


          <div className=" left flex flex-1  items-center">
            <div className="cursor-pointer text-[16px] mobile:hidden pr-10">
          JumpStart
            </div>

            {/* Search Input */}
            {/* <div className="SearchContainer flex border-[2px] border-solid border-lightgrey rounded-md items-center ml-[10px] p-[5px]">
                <input type='text' className="border-none mobile:w-[50px]" placeholder="Search"/>
                <SearchIcon className="text-[#8a4af3] m" style={{fontSize: '16px'}}/>
            </div> */}

<NavLink to="/">
            <div><h1>Home</h1></div>
            </NavLink>
            <NavLink to="/register">
              <div className={style}>Products</div>
                  </NavLink>

                  <NavLink to="/register">
              <div className={style}> Register</div>
                  </NavLink>

                  <NavLink to="/login">
              <div className={style}>Login</div>
                  </NavLink>
          </div>


          {/* Logo */}
          <div className="center flex-1 text-center  mobile:ml-6">
          <NavLink to="/">
             
              </NavLink>
          </div>

          {/* Right Side */}
          <div className="right flex flex-1 items-center justify-end mobile:justify-center  hover:bg-gray-100 mobile:flex-[2]">

          <div className="SearchContainer flex border-[2px] border-solid border-lightgrey rounded-md items-center ml-[10px] p-[5px] hover:text-red-500">
                <input type='text' className="border-none mobile:w-[50px]" placeholder="Search"/>
                <SearchIcon className="text-[#a7a1af] m" style={{fontSize: '16px'}}/>
            </div>

              <NavLink to="/cart">
              <div className={style}>
                {/* <BadgeIcon badgeContent={4} color='primary'>
                  <AddShoppingCartIcon/>
                </BadgeIcon> */}
                <AddShoppingCartIcon/>
              </div>
              </NavLink>
          </div>

      </div>
      
   

    </div>

  );
};

export default Navbar;
