import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { CartShoppingProvider } from "./client/Contexts/CartShopping";
import Vehicles from "./client/Components/Vehicles";
import Header from "./client/Components/Header";
import Pagination from "./client/Components/Pagination";
import CartShop from "./client/Components/CartShop";

import styled from "styled-components";
import "./App.css";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 80vw;
`;

function App() {
  const [cartShopping, setCartShopping] = useState([]);
  const [listOfVehicles, setListOfVehicles] = useState([]);
  const [totalNumberOfVehicles, setTotalNumberOfVehicles] = useState();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
 
  const [vehiclesPerPage, setVehiclesPerPage] = useState(8);


  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
        const res = await axios.get('https://swapi.dev/api/vehicles/');
      setListOfVehicles(res.data.results);
      setTotalNumberOfVehicles(res.data.count);
      setLoading(false);
    };
    fetchVehicles();
  }, [listOfVehicles, totalNumberOfVehicles]);

  console.log("listOfvehicules", listOfVehicles);

  const providerValue = useMemo(
    () => ({
      cartShopping,
      setCartShopping,
      setCurrentPage,
      listOfVehicles,
      loading,
      setLoading,
    }),
    [cartShopping, setCartShopping, listOfVehicles, loading, setLoading]
  );

  const indexOfLastVehicle = currentPage * vehiclesPerPage;
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
  const currentVehicles = listOfVehicles?.slice(
    indexOfFirstVehicle,
    indexOfLastVehicle
  );

  return (
    <CartShoppingProvider value={providerValue}>
      <Header />
      <CartShop />
      <Container>
        <Vehicles currentVehicles={currentVehicles} loading={loading} />
        <Pagination
          vehiclesPerPage={vehiclesPerPage}
          totalNumberOfVehicles={totalNumberOfVehicles}
        />
      </Container>
    </CartShoppingProvider>
  );
}

export default App;
