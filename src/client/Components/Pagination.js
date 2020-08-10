import React, {useContext} from "react";
import styled from "styled-components";
import CartShoppingContext from "../Contexts/CartShopping";

const StyledLi = styled.li`
    font-size:2em;
    text-decoration: none;
    background-color: white;
    color: yellow;
`;

const Container = styled.div`
  display: flex;
`;

function Pagination({ totalNumberOfVehicles, vehiclesPerPage }) {
    const {setCurrentPage } = useContext(CartShoppingContext);
  const pageNumbers = [];
  for (
    let i = 0;
    i <= Math.ceil(totalNumberOfVehicles / vehiclesPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <Container>
      {pageNumbers.map((number) => (
        <StyledLi key={number}>
          <a onClick={() => {setCurrentPage(number)}} href="!#"> {number}</a>
        </StyledLi>
      ))}
    </Container>
  );
}

export default Pagination;
