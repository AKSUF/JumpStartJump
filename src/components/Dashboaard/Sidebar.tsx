import React from 'react'
import AdminDash from './AdminDashboard'
import { Grid } from '@mui/material';
import Content from '../Content';

import CustomerDash from './Customer.Dashboard';
import EmployeeDash from './StoremanagerDashboard';
import ProducerDash from './ProducerDashboard';
import ManagerDash from './ManagerDash';
import RiderDash from './Rider'
type Props = {
    role: String;
  };
function Sidebar (props: Props) {
    const { role } = props;
  return (
    <div>
         <div className="flex min-h-screen">
            
         <Grid container >
          <Grid item xl={1.6} lg={1.9} md={2.4}  className="   shadow-xl  test2" >
            <div className="lg:fixed">
            {role === "ADMIN" && window.location.toString().includes("admin") ? (
            <AdminDash />
          ) : (
            <></>
          )}
            {role === "CUSTOMER" ? <CustomerDash role={"role"}/> : <></>}
            {role === "STOREMANAGER" ? <EmployeeDash/> : <></>}
            {role === "PRODUCER" ? <ProducerDash/> : <></>}
            {role === "MANAGER" ? <ManagerDash/> : <></>}
            {role === "RIDER" ? <RiderDash/> : <></>}
             </div>
             </Grid>
             <Grid item xl={10.4} lg={10.1} md={9.6} xs={12}>
          
            
            <div className="">
            <Content />
            </div>
            
         
          </Grid>
          </Grid>
          </div>
        
    </div>
  )
}

export default Sidebar