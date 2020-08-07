import React, { useState, useMemo } from "react";
import axios from "axios";
import { CartShoppingProvider } from "./client/Contexts/CartShopping";
import Card from "./client/Components/Card";
import Header from "./client/Components/Header";
import CartShop from "./client/Components/CartShop";


import styled from "styled-components";
import "./App.css";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100vw;
`;

function App() {
  const [cartShopping, setCartShopping] = useState([]);
  const [isCartFull, setIsCartFull] = useState(false);
  const [listOfVehicules, setListOfVehicules] = useState();

  const apiURL = "https://swapi.dev/api/vehicles/";
  if (!listOfVehicules) {
    axios.get(apiURL).then((res) => {
      setListOfVehicules(res.data.results);
    });
  }

  const vehicule = listOfVehicules?.map((vehicule) => {
    return <Card style={{display: 'contents'}} vehicule={vehicule} />;
  });

  const providerValue = useMemo(
    () => ({ cartShopping, setCartShopping, listOfVehicules, isCartFull, setIsCartFull }),
    [cartShopping, setCartShopping, listOfVehicules, isCartFull, setIsCartFull]
  );

  return (
    <CartShoppingProvider value={providerValue}>
      <Header />
      <CartShop />
      <Container> 
        {vehicule}  </Container>
    </CartShoppingProvider>
  );
}

export default App;
