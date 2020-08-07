import React, { useContext } from "react";
import CartShoppingContext from "../Contexts/CartShopping";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 10vw;
  position: fixed;
  background-color: white;
  top: 100px;
  right: 0;
`;

function CartShop() {
  const { cartShopping, isCartFull } = useContext(CartShoppingContext);
  return (
      <>
      {isCartFull && ( 
          <Container>
      {cartShopping &&
        cartShopping.map((vehicule) => {
          for (let i = 0; i < cartShopping.length; i++) {
            return (
              <div key={`${vehicule[i].name}key`}>
                name: {vehicule[i].name}, model: {vehicule[i].model}, crew:{" "}
                {vehicule[i].crew}, passengers: {vehicule[i].passengers}, price:{" "}
                {vehicule[i].cost_in_credits}
              </div>
            );
          }
        })}
    </Container>)
    }
    </>
  );
}

export default CartShop;
