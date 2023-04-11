import React, { useEffect, useState } from "react";
import { showAllStore } from "../../service/StoreService";
import { getPersonalProfile, getUsers } from "../../service/ProfileService"
import { toast } from "react-toastify";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import filteringProduct from "../../Utils/filteringProduct";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  role: String;
};
const Stores = (props: Props) => {
  const [stores, setStores] = useState<any>();
  const [allStores, setAllStores] = useState<any>();

  useEffect(() => {
    getPersonalProfile(token)
      .then((res) => {
        console.log(res.data);

        showAllStore(token)
          .then((res) => {
            setStores(res.data);
            setAllStores(res.data);
            return;
          })
          .catch((error) => {
            toast.error("Error While Fetching, Please retry later!");
          });
      })
      .catch((error) => {
        toast.error("Error While Fetching, Please retry later!");
      });
  }, []);

  const token = localStorage.getItem("token");
  // // function to delete meal
  // function deleteStoreDetails(store: any) {
  //   if (window.confirm("Are you sure")) {
  //     deleteStore(store.store_id, token)
  //       .then((data) => {
  //         console.log(data);
  //         toast.success("Store Details is delete");
  //         let newStoreContent = stores.filter(
  //           (m: any) => m.store_id != store.store_id
  //         );
  //         setStores([...newStoreContent]);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         toast.error("Error in deleting Store");
  //       });
  //   }
  // }
  const filterStore = (e: React.ChangeEvent<HTMLSelectElement>) => {
    filteringProduct(e, setStores, allStores);
  };

  return (
    <div>
      <div className="sm:m-4 ">
        <div className="">
         
          <Container maxWidth="xl">
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Box pt={6}>
                  <FormControl className="w-[200px] ">
                    <InputLabel
                      className="text-xl"
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      Store Type
                    </InputLabel>
                    <NativeSelect
                      defaultValue={"all"}
                      inputProps={{
                        name: "age",
                        id: "uncontrolled-native",
                      }}
                      onChange={(e) => filterStore(e)}
                    >
                      <option value={"all"}>All</option>
                      <option value={"Makeup"}>Makeup</option>
                      <option value={"Grocery"}>Grocery</option>
                      <option value={"Electronic"}>Electronic</option>
                      <option value={"Fruit"}>Fruit</option>
                      <option value={"Flower shop"}>Flower shop</option>
                      <option value={"Machinery"}>Machinery</option>
                      <option value={"Book Shop"}>Book Shop</option>
                      <option value={"Furniture Shop"}>Furniture Shop</option>
                      <option value={"Toys Shop"}>Toys Shop</option>
                    </NativeSelect>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box p={1}>
                  <Grid container spacing={1}>
                    {stores != undefined
                      ? stores.map((store: any, index: any) => (
                          <Grid item lg={2} md={4} xs={6}>
                            <Card elevation={10}>
                              <Box
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                                pt={1}
                              >
                                <CardMedia
                                  sx={{ width: "90%" }}
                                  component="img"
                                  alt="green iguana"
                                  height="90"
                                  image={
                                    "http://localhost:8080/api/v1/admin/store/image/" +
                                    store.store_image
                                  }
                                />
                              </Box>
                              <CardContent>
                                <Typography gutterBottom>
                                  <div className="md:text-xl">
                                    <span className="font-bold">
                                      Store Name
                                    </span>
                                    : {store.storeName}
                                  </div>
                                </Typography>
                                <Typography
                                  className="text-xl"
                                  color="text.secondary"
                                >
                                  <h2>{store.storeName}</h2>
                                  <h3> {store.storeLocation}</h3>
                                  <h3>
                                    {" "}
                                    {store.opens} : {store.closes}
                                  </h3>
                                </Typography>
                              </CardContent>
                              <CardActions>
                                <>
                                <Link to={`Storedetails/store/${store.storeId}`}>
                                    <button className=" bg-green-700 md:py-2 py-1 hover:bg-green-600 md:w-[80px] w-[60px] border hover:border-black  text-white rounded-md mx-auto ">
                                      Details
                                    </button>
                                  </Link>
                                  <Link to={`StoredUpdate/store/${store.storeId}`}>
                                    <button className=" bg-gray-700 md:py-2 py-1 mr-2 hover:bg-gray-800 md:w-[80px] w-[60px] border hover:border-black  text-white rounded-md mx-auto ">
                                      Update
                                    </button>
                                  </Link>

                                  <button
                                 
                                    className=" bg-red-700 md:py-2 py-1 hover:bg-red-800 md:w-[80px] w-[60px] border hover:border-black  text-white rounded-md mx-auto "
                                  >
                                    <DeleteIcon />
                                  </button>
                                </>
                              </CardActions>
                            </Card>
                          </Grid>
                        ))
                      : ""}
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Stores;
