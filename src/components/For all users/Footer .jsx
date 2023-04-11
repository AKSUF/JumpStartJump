import FacebookIcon from '@mui/icons-material/Facebook';
import React from "react";
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
const Footer = () => {
    const socialStyle = 'm-3 rounded-full cursor-pointer p-2 text-white';
  return (

    <div className="flex items-center justify-around p-2 mobile:flex-col mobile:items-start">
      <div className="flex-1 flex flex-col flex-wrap p-2">
        <h1 className="text-[25px]">ZAINKEEPSCODE</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem
          soluta quis porro eveniet. Nulla modi, quas unde eaque vel, quaerat
          repellendus dignissimos iure itaque architecto pariatur quia a eveniet
          veniam?
        </p>
        <div className="flex items-center justify-center mt-3 self-start">
          <div className={socialStyle + ` bg-blue-700`}>
            <FacebookIcon />
          </div>
          <div className={socialStyle + ` bg-orange-500`}>
            <InstagramIcon />
          </div>
          <div className={socialStyle + ` bg-sky-400`}>
            <TwitterIcon />
          </div>
          <div className={socialStyle + ` bg-red-600`}>
            <PinterestIcon/>
          </div>
        </div>
      </div>


      <div className="flex-1 flex flex-col p-2">
        <div className="flex m-3">
           
            <p className='pl-3'>State of California</p>
        </div>
        <div className="flex m-3">
       
            <p className='pl-3'>+92 12345678</p>
        </div>
        <div className="flex m-3">
            
            <p className='pl-3'>Ahmadroa925@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;