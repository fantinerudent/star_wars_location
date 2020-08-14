import React, { useContext } from "react";
import CartShoppingContext from "../Contexts/CartShopping";
import styled from "styled-components";

const Container = styled.div`
  @media screen and (min-width: 1200px) {
    height: 100vh;
    width: 35%;
    position: fixed;
    top: 0;
    right: 0;
    color: white;
    overflow: scroll;
  }
  @media screen and (max-width: 1200px) {
    display: inline-flex;
    position: relative;
    height: 20%;
    width: 100vw;
    border: 3px solid white;
    & > h2 {
      position: relative;
      margin: 0 20px;
    }
  }
    & > h2 {
      color: red;
    }

  background-color: black;
`;

const TitleDisplay = styled.span`
  font-size: 1.5vw;
  color: yellow;
  font-weight: bold;
`;

const Sum = styled.span`
  font-size: 2.5vw;
  color: yellow;
  font-weight: bold;
  @media screen and (max-width: 1200px) {
    position: relative;
    margin-left: 30px;
    display: flex;
    align-items: center;
  }
`;

const ItemContainer = styled.div`
@media screen and (min-width: 1200px) {
  margin-bottom: 10px;
}
@media screen and (max-width: 1200px) {
  margin-left: 10px;
}
  border: yellow 2px solid;
  width:fit-content;
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
      <h2> CARTSHOP :</h2>
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
      <Sum> Total : ${sum}$ </Sum>
    </Container>
  );
}

export default CartShop;
