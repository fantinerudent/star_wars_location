import axios from "axios";
import React, { useState, useContext } from "react";
import styled from "styled-components";
import CartShoppingContext from "../Contexts/CartShopping";
import img from '../../assets/starfighter.jpeg'
// STYLE -
const StyledTitle = styled.h1`
  color: pink;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
`;
const CardWrapper = styled.div`
     font-size:1em
     display: flex;
     /* flex-direction: row; */
     background-color: lightcyan;
     width: 100%;
     height: 100%;
     border-radius: 30px;
 `;
const StyledImage = styled.img`
position:relative;
    border-radius: 30px;
    margin:100px;
    height: 200px;
    width:200px;
`;

function Card() {
  const { cartShopping, setCartShopping } = useContext(CartShoppingContext);

  var apiURL = "https://swapi.dev/api/vehicles/";
  const [listOfVehicules, setListOfVehicules] = useState();

  if (!listOfVehicules) {
    axios.get(apiURL).then((res) => {
      setListOfVehicules(res.data.results);
    });
  }

  const handleClick = async (event, nameVehicule, idButton) => {
    let buttonClicked = document.getElementById(idButton);

    if (buttonClicked.innerText === "Make a reservation") {
      let newCartValue = [...cartShopping];
      await axios
        .get(`https://swapi.dev/api/vehicles/?search=${nameVehicule}`)
        .then((res) => {
          newCartValue.push(res.data.results);
        });
      setCartShopping(newCartValue);
      buttonClicked.innerText = "Cancel reservation";
    } else if (buttonClicked.innerText === "Cancel reservation") {
      for (let i = 0; i < cartShopping.length; i++) {
        console.log("cartshopping", cartShopping);
        if (cartShopping[i][0].name.includes(nameVehicule)) {
          const index = cartShopping.findIndex(
            (item) => item[0].name === nameVehicule
          );
          // if I didn't do a copy I'd have something going wrong with the slice.
          let copyArrayCartShopping = [...cartShopping];
          copyArrayCartShopping.splice(index, 1);
          setCartShopping(copyArrayCartShopping);
          buttonClicked.innerText = "Make a reservation";
        }
      }
    }
  };

  let listVehiculesToDisplay;
  if (listOfVehicules) {



    listVehiculesToDisplay = listOfVehicules.map((vehicule) => (
      <CardWrapper key={`${vehicule.name}wrapper`}>
        <StyledImage src={img} />
        <StyledTitle>name :</StyledTitle> {vehicule.name}
        <p>model :</p> {vehicule.model}
        <p> number of seats : </p> crew: {vehicule.crew} passengers:{" "}
        {vehicule.passengers}
        <p> Cost :</p> {vehicule.cost_in_credits}
        <br />
        {vehicule.cost_in_credits !== "unknown" && (
          <button
            id={`${vehicule.name}button`}
            onClick={(event) =>
              handleClick(event, vehicule.name, `${vehicule.name}button`)
            }
          >
            Make a reservation
          </button>
        )}
        {vehicule.cost_in_credits === "unknown" && (
          <p> this vehicule isn't available </p>
        )}
      </CardWrapper>
    ));
  }
  return (
    <Container>
      {listVehiculesToDisplay}
    </Container>
  );
}

export default Card;
