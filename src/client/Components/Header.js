import React from "react";
import styled from 'styled-components';

const StyledDiv = styled.div`
  width: 100vw;
  height: 10vh;
  top:0;
  background-color: black;
  color: white;
  font-size: 5vw;
  &:first-child  {
    @media screen and (max-width: 1200px) {
    padding: 30px 0;
    }
    @media screen and (min-width: 1200px) {
    padding: 20px 10px;
    }
    margin: 0;
    text-align: center;
   }
`


function Header() {
  return (
    <StyledDiv>
     <div>Spaceship shop'</div> 
    </StyledDiv>
  );
}

export default Header;
