import axios from "axios";
import React, { useState, useContext } from "react";
import styled from "styled-components";
import CartShoppingContext from "../Contexts/CartShopping";
import img from "../../assets/starfighter.jpeg";
import bgimg from "../../assets/galaxy.jpg";
// STYLE -
const StyledTitle = styled.h1`
  color: pink;
`;
const CardWrapper = styled.div`
  font-size: 1em;
  display: flex;
  flex-wrap: wrap;
  border-radius: 30px;
  flex-direction: column;
  background-image: url(${bgimg});
  background-size: cover;
  margin: 10px;
`;
const StyledImage = styled.img`
  position: relative;
  border-radius: 30px;
  margin: 60px;
  height: 200px;
  width: 200px;
`;
const StyledDiv = styled.div`
  display: contents;
`;
const Button = styled.button`
  box-shadow: inset 0px 1px 0px 0px #ffffff;
  background: linear-gradient(to bottom, #ededed 5%, #dfdfdf 100%);
  background-color: #ededed;
  border-radius: 6px;
  border: 1px solid #dcdcdc;
  display: inline-block;
  cursor: pointer;
  color: #777777;
  font-family: Arial;
  font-size: 15px;
  font-weight: bold;
  padding: 6px 24px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #ffffff;
  &:hover {
    background: linear-gradient(to bottom, #dfdfdf 5%, #ededed 100%);
    background-color: #dfdfdf;
  }
`;

function Vehicles({ currentVehicles, loading }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const { cartShopping, setCartShopping } = useContext(CartShoppingContext);

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

  const handleClickModal = (event) => {
    event.preventDefault();
    setModalOpen(!isModalOpen);
  };

  return (
    <>
      {loading && <h1> Loading.... </h1>}
      {currentVehicles?.map((vehicle) => {
        return (
          <CardWrapper key={`${vehicle.name}wrapper`}>
            <StyledTitle>{vehicle.name}</StyledTitle> 
            <StyledImage src={img} id={`${vehicle.name}img`} />
            <Button onClick={(event) => handleClickModal(event)}>
              {isModalOpen ? "show less" : "show more"}
            </Button>
            {isModalOpen && (
              <StyledDiv id={`${vehicle.name}modal`}>
                <p>model :</p> {vehicle.model}
                <p> number of seats : </p> crew: {vehicle.crew} passengers:{" "}
                {vehicle.passengers}
                <p> Cost :</p> {vehicle.cost_in_credits}
                <br />
                {vehicle.cost_in_credits !== "unknown" && (
                  <Button
                    id={`${vehicle.name}button`}
                    onClick={(event) =>
                      handleClick(event, vehicle.name, `${vehicle.name}button`)
                    }
                  >
                    Make a reservation
                  </Button>
                )}
                {vehicle.cost_in_credits === "unknown" && (
                  <p> this vehicule isn't available </p>
                )}
              </StyledDiv>
            )}
          </CardWrapper>
        );
      })}
    </>
  );
}

export default Vehicles;
