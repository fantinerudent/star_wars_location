import React from "react";
import styled from "styled-components";

import Modal from "../Components/Modal";
import img from "../../assets/starfighter.jpeg";
import bgimg from "../../assets/galaxy.jpg";
// STYLE -
const StyledTitle = styled.h1`
  color: pink;
  display: inline-block;
  font-size: 2em;
  height: 100px;
  margin: 15px 0 0 20px;
`;
const CardWrapper = styled.div`
  font-size: 1em;
  display: flex;
  flex-wrap: wrap;
  width: 30%;
  border-radius: 30px;
  flex-direction: column;
  background-image: url(${bgimg});
  background-size: cover;
  margin: 10px;
`;
const StyledImage = styled.img`
  position: relative;
  align-self: center;
  border-radius: 30px;
  margin: 20px;
  height: 200px;
  width: 200px;
  &:hover {
    height: 210px;
    width: 210px;
  }
`;
const NotAvailable = styled.div`
  background-color: red;
  color: black;
  width: fit-content;
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
`;
function Vehicles({ currentVehicles, loading }) {
  return (
    <>
      {loading && <h1> Loading.... </h1>}
      {currentVehicles?.map((vehicle) => {
        return (
          <CardWrapper key={`${vehicle.name}wrapper`}>
            <StyledTitle>
              {vehicle.name}
              {vehicle.cost_in_credits === "unknown" && (
                <NotAvailable> Not available</NotAvailable>
              )}
            </StyledTitle>
            <StyledImage src={img} id={`${vehicle.name}img`} />
            <Modal vehicle={vehicle} />
          </CardWrapper>
        );
      })}
    </>
  );
}

export default Vehicles;
