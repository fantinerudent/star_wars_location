  
import React from 'react'

const CartShoppingContext = React.createContext();

export const CartShoppingProvider = CartShoppingContext.Provider
export const CartShoppingConsumer = CartShoppingContext.Consumer

export default CartShoppingContext