import React from "react";
import styled from 'styled-components';

const StyledDiv = styled.div`
  width: 100%;
  height: 100px;
  background-color: black;
  color: white;
  font-size: 4em;
  justify-content: center;
  &:first-child  {
    margin: auto;
    text-align: center;
   }
`


function Header() {
  return (
    <StyledDiv>
     <p>Spaceship shop'</p> 
    </StyledDiv>
  );
}

export default Header;
