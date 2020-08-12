import React, { useContext } from "react";
import CartShoppingContext from "../Contexts/CartShopping";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 17vw;
  position: fixed;
  background-color: black;
  top: 0;
  right: 0;
  color: white;
  overflow: scroll;
`;

const TitleDisplay = styled.span`
  font-size: 1.5em;
  color: yellow;
  font-weight: bold;
`;
const ItemContainer = styled.div`
  margin-bottom: 10px;
  border: yellow 2px solid;
  padding: 10px;
  border-radius: 10px;
`;

function CartShop() {
  const { cartShopping } = useContext(CartShoppingContext);
  
  let sum = 0;
  if (cartShopping) {
    cartShopping.map((vehicule) => {
      let result = Number(vehicule[0].cost_in_credits);
      return (sum = sum + result);
    });
  }

  return (
    <Container>
      <span> CARTSHOP :</span>
      {cartShopping &&
        cartShopping.map((vehicule) => {
          for (let i = 0; i < cartShopping.length; i++) {
            return (
              <ItemContainer key={`${vehicule[i].name}key`}>
                <TitleDisplay>name:</TitleDisplay> {vehicule[i].name}
                <br />
                <TitleDisplay>model:</TitleDisplay> {vehicule[i].model}
                <br />
                <TitleDisplay>crew:</TitleDisplay> {vehicule[i].crew}
                <br />
                <TitleDisplay>passengers:</TitleDisplay>{" "}
                {vehicule[i].passengers}
                <br />
                <TitleDisplay>price:</TitleDisplay>{" "}
                {vehicule[i].cost_in_credits}
                <br />
              </ItemContainer>
            );
          }
        })}
      <TitleDisplay> Total : ${sum}$ </TitleDisplay>
    </Container>
  );
}

export default CartShop;
