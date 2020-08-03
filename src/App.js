import React, {useState, useMemo} from 'react';
import {CartShoppingProvider} from "./client/Contexts/CartShopping"
import Card from './client/Components/Card'
import Header from './client/Components/Header'
import './App.css';

function App() {

  const [cartShopping, setCartShopping] = useState([]);

  const providerValue = useMemo(
    () => ({ cartShopping, setCartShopping }),
    [cartShopping, setCartShopping]
  );

  return (
    <CartShoppingProvider value={providerValue}>
      <Header/>
      <Card/>
    </CartShoppingProvider>
  );
}

export default App;
