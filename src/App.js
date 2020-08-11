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
  width: 65%;
`;

function App() {
  const [cartShopping, setCartShopping] = useState([]);
  const [listOfVehicles, setListOfVehicles] = useState([]);
  const [totalNumberOfVehicles, setTotalNumberOfVehicles] = useState();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [vehiclesPerPage] = useState(6);

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      let arrayOfVehicles = [];
      let resPage1 = await axios.get(`https://swapi.dev/api/vehicles/?page=1`);
      let resPage2 = await axios.get(`https://swapi.dev/api/vehicles/?page=2`);
      let resPage3 = await axios.get(`https://swapi.dev/api/vehicles/?page=3`);
      let resPage4 = await axios.get(`https://swapi.dev/api/vehicles/?page=4`);

      resPage1 = resPage1.data.results;
      resPage1.map((vehicle) => {
        arrayOfVehicles.push(vehicle);
      });
      resPage2 = resPage2.data.results;
      resPage2.map((vehicle) => {
        arrayOfVehicles.push(vehicle);
      });
      resPage3 = resPage3.data.results;
      resPage3.map((vehicle) => {
        arrayOfVehicles.push(vehicle);
      });
      resPage4 = resPage4.data.results;
      resPage4.map((vehicle) => {
        arrayOfVehicles.push(vehicle);
      });
      setListOfVehicles(arrayOfVehicles);
      setTotalNumberOfVehicles(arrayOfVehicles.length);
      setLoading(false);
    };

    fetchVehicles();
  }, []);

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
