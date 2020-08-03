import axios from "axios";
import React, { useState, useContext } from 'react';
import CartShoppingContext from '../Contexts/CartShopping';


function Header() {
    const [cartShopOpen, setCartShopOpen] = useState(false);
    const { cartShopping, setCartShopping } = useContext(CartShoppingContext)


    const handleClick = () => {
        if (!cartShopOpen) {
            console.log(cartShopping)
            setCartShopOpen(true);
        } else {
            setCartShopOpen(false)
        }
    }




    return (
        <>
            <h1>
                ma flotte
       </h1>
            <button onClick={handleClick}> panier</button>
            {cartShopOpen && (
                <>
                { cartShopping && (
                    cartShopping.map((vehicule) => {
                        console.log("vehicule",vehicule)
                    return <div key={Math.random()*100}> { vehicule[0].name}</div>
                    })
                    )}
                </>
            )}

        </>
    )
}

export default Header;
