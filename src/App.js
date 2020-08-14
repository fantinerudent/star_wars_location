import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { CartShoppingProvider } from "./client/Contexts/CartShopping";
import Vehicles from "./client/Components/Vehicles";
import Header from "./client/Components/Header";
import Pagination from "./client/Components/Pagination";
import CartShop from "./client/Components/CartShop";

import styled from "styled-components";
import "./App.css";

const VehiclesContainer = styled.div`
  @media screen and (min-width: 1200px) {
  display:none;
  display: flex;
  flex-wrap: wrap;
  height: 85vh;
  max-width: 85vw;
  };
  @media screen and (max-width: 1200px) {
  display: flex;
  flex-direction:row;
  flex-wrap: wrap;
  max-width: 80vw;
  };
`;


function App() {
  const [cartShopping, setCartShopping] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
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
        vehicle.booked = false;
        arrayOfVehicles.push(vehicle);
      });
      resPage2 = resPage2.data.results;
      resPage2.map((vehicle) => {
        vehicle.booked = false;
        arrayOfVehicles.push(vehicle);
      });
      resPage3 = resPage3.data.results;
      resPage3.map((vehicle) => {
        vehicle.booked = false;
        arrayOfVehicles.push(vehicle);
      });
      resPage4 = resPage4.data.results;
      resPage4.map((vehicle) => {
        vehicle.booked = false;
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
      isModalOpen,
      setModalOpen,
      cartShopping,
      setCartShopping,
      setCurrentPage,
      listOfVehicles,
      loading,
      setLoading,
    }),
    [isModalOpen, cartShopping, listOfVehicles, loading]
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
        <VehiclesContainer>
          <Vehicles currentVehicles={currentVehicles} loading={loading} />
        </VehiclesContainer>
        <Pagination
          vehiclesPerPage={vehiclesPerPage}
          totalNumberOfVehicles={totalNumberOfVehicles}
        />
    </CartShoppingProvider>
  );
}

export default App;
