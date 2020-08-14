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
const VehicleContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
`;

const StyledP = styled.p`
  text-decoration: underline;
  color: yellow;
  position: relative;
  margin: 0 auto;
  font-size: 1vw;
`;

const StyledTable = styled.table`
  & th {
    border: 1px solid yellow;
    color: red;
  }
  & td {
    border: 1px solid pink;
  }
  color: white;
  @media screen and (min-width: 1200px) {
    font-size: 1.2vw;
  }
  @media screen and (max-width: 1200px) {
    font-size: 2vw;
  }
  position: relative;
  align-self: center;
  border-collapse: separate;
  border: 2px white double;
  box-sizing: border-box;
`;

function Modal({ vehicle }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isVehicleBooked, setVehicleBooked] = useState(vehicle.booked);
  const { cartShopping, setCartShopping } = useContext(CartShoppingContext);

  const handleClick = async (event, vehicle, nameVehicule, idButton) => {
    if (!isVehicleBooked) {
      let newCartValue = [...cartShopping];
      await axios
        .get(`https://swapi.dev/api/vehicles/?search=${nameVehicule}`)
        .then((res) => {
          newCartValue.push(res.data.results);
        });
      setCartShopping(newCartValue);
    } else if (isVehicleBooked) {
      for (let i = 0; i < cartShopping.length; i++) {
        if (cartShopping[i][0].name.includes(nameVehicule)) {
          const index = cartShopping.findIndex(
            (item) => item[0].name === nameVehicule
          );
          // if I didn't do a copy I'd have something going wrong with the slice.
          let copyArrayCartShopping = [...cartShopping];
          copyArrayCartShopping.splice(index, 1);
          setCartShopping(copyArrayCartShopping);
        }
      }
    }
    vehicle.booked = !vehicle.booked;
    setVehicleBooked(vehicle.booked);
    setModalOpen(!isModalOpen);
  };

  const handleClickModal = (event, modalId) => {
    event.preventDefault();
    setModalOpen(!isModalOpen);
  };

  return (
    <VehicleContainer>
      <Button
        id={`${vehicle.name}button-modal`}
        onClick={(event) => handleClickModal(event)}
      >
        {isModalOpen ? "show less" : "show more"}
      </Button>
      {isModalOpen && (
        <>
          <StyledTable>
            <tbody>
              <tr>
                <th>Model : </th>
                <th> Number of seats : </th>
                <th> Cost: </th>
              </tr>
              <tr>
                <td>{vehicle.model}</td>
                <td>
                  crew: {vehicle.crew} - passengers: {vehicle.passengers}
                </td>
                <td>{vehicle.cost_in_credits}</td>
              </tr>
            </tbody>
          </StyledTable>

          {vehicle.cost_in_credits !== "unknown" && (
            <Button
              id={`${vehicle.name}button`}
              onClick={(event) =>
                handleClick(
                  event,
                  vehicle,
                  vehicle.name,
                  `${vehicle.name}button`
                )
              }
            >
              {isVehicleBooked ? "Cancel reservation" : "Make a reservation"}
            </Button>
          )}
          {vehicle.cost_in_credits === "unknown" && (
            <StyledP> this vehicule isn't available </StyledP>
          )}
        </>
      )}
    </VehicleContainer>
  );
}

export default Modal;
