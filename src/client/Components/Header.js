import React, { useContext } from "react";
import CartShoppingContext from "../Contexts/CartShopping";

function Header() {
  const { cartShopping, setCartShopping } = useContext(CartShoppingContext);

  return (
    <>
      <h1>ma flotte</h1>

      <>
        {cartShopping &&
          cartShopping.map((vehicule) => {
            for (let i = 0; i < cartShopping.length; i++) {
              return (
                <div key={`${vehicule[i].name}key`}>
                  name: {vehicule[i].name}, model: {vehicule[i].model}, crew:{" "}
                  {vehicule[i].crew}, passengers: {vehicule[i].passengers},
                  price: {vehicule[i].cost_in_credits}
                </div>
              );
            }
          })}
      </>
    </>
  );
}

export default Header;
