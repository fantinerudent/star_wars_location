import React, {useContext} from "react";
import styled from "styled-components";
import CartShoppingContext from "../Contexts/CartShopping";

const StyledA = styled.a`
    font-size:2em;
    text-decoration: none;
    outline: none;
    color: yellow;
`;

const Container = styled.div`
  display: flex;
  color: white;
  position: relative;
  bottom: 10px;
  left: 15%;
`;

function Pagination({ totalNumberOfVehicles, vehiclesPerPage }) {
    const {setCurrentPage } = useContext(CartShoppingContext);
  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(totalNumberOfVehicles / vehiclesPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <Container>
      {pageNumbers.map((number) => (
        <li key={number}>
         Page : <StyledA onClick={() => {setCurrentPage(number)}} href="!#"> {number}</StyledA>
        </li>
      ))}
    </Container>
  );
}

export default Pagination;
