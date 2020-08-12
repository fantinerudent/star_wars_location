import React from "react";
import styled from 'styled-components';

const StyledDiv = styled.div`
  width: 83vw;
  height: 100px;
  top:0;
  background-color: black;
  color: white;
  font-size: 3em;
  &:first-child  {
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
