import React, { useState, useContext } from "react";
import CartShoppingContext from "../Contexts/CartShopping";
import axios from "axios";
import styled from "styled-components";

const Button = styled.button`
  width: 100%;
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

const StyledTH = styled.th`
  display: flex;
  flex-direction: column;
  color: yellow;
  font-size: 1.3em;
`;

const StyledP = styled.p`
  text-decoration: underline;
  color: yellow;
  margin-left: 100px;
`;

const StyledTable = styled.table`
  color: white;
`;

function Modal({ vehicle }) {
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

  const handleClickModal = (event, modalId) => {
    event.preventDefault();
    setModalOpen(!isModalOpen);
  };

  return (
    <div>
      <Button
        id={`${vehicle.name}button-modal`}
        onClick={(event) => handleClickModal(event)}
      >
        {isModalOpen ? "show less" : "show more"}
      </Button>
      {isModalOpen && (
        <>
          <StyledTable>
            <tr>
              <StyledTH>model :</StyledTH>
              <th> {vehicle.model} </th>
            </tr>
            <tr>
              <StyledTH>number of seats :</StyledTH>
              <th>
                crew: {vehicle.crew}
              </th>
              <th>
                passengers: {vehicle.passengers}
              </th>
            </tr>
            <StyledTH> Cost :</StyledTH>
            <th> {vehicle.cost_in_credits} </th>
          </StyledTable>
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
            <StyledP> this vehicule isn't available </StyledP>
          )}
        </>
      )}
    </div>
  );
}

export default Modal;
