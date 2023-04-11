import React, { useEffect } from "react";
import Footer from '../components/Layout/Footer'
import { useNavigate, } from 'react-router-dom';
import { Grid } from "@mui/material";
import DashNav from "../components/Dashboaard/DashNav";
import Sidebar from "../components/Dashboaard/Sidebar";
type Props = {
    role: String;
  };
function Dashboard (props: Props) {
    const { role } = props;
    const navigate = useNavigate();
    const token: any = localStorage.getItem("token");
    useEffect(() => {
      if (role.length > 0 && token.length > 0) {
        navigate(`/${role.toLowerCase()}`, { replace: true });
      }
    }, []);
  return (
    <div className="" >
          <Grid container spacing={1}  className="">
         <Grid xs={12}><DashNav role={role} /></Grid>
            
           
        <Grid item xs={12}  >
       
        <Sidebar role={role} />
      
     
      </Grid>
      </Grid>
      <Footer />
    </div>
  )
}

export default Dashboard





