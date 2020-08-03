import axios from "axios";
import React, {useState, useContext} from 'react';
import styled from 'styled-components';
import CartShoppingContext from '../Contexts/CartShopping';


function Card() {
    const {cartShopping, setCartShopping} = useContext(CartShoppingContext)

    var apiURL = "https://swapi.dev/api/vehicles/"
    const [results, setResults] = useState();

    if (!results) {
        axios.get(apiURL).then(res => {
            setResults(res.data.results)  
        });
    }

    // STYLE -
    const StyledTitle = styled.h1`
     color: pink;
    `
    const Container = styled.div`
        display: flex;
    `
    const CardWrapper = styled.div`
        font-size:1em
        display: flex;
        background-color: lightcyan;
        width: 100%;
        height: 400px;
        border-radius: 30px;
    `



    const handleClick = (event, id) => {
        event.preventDefault();
        let newCartValue = [...cartShopping] ;
        // newCartValue.push(id);
        axios.get(`https://swapi.dev/api/vehicles/?search=${id}`).then(res => 
        { newCartValue.push(res.data.results)});
        setCartShopping(newCartValue);
        console.log('cart shopping',cartShopping)
    }

    let listVehicules;
    if (results) {
        listVehicules = results.map((vehicule) => 
            <CardWrapper>
              <StyledTitle>name :</StyledTitle> {vehicule.name} 
                <p>model :</p> {vehicule.model}
                <p> number of seats : </p> crew: {vehicule.crew} passengers: {vehicule.passengers}
                <p> Cost :</p> {vehicule.cost_in_credits}
                <br/>
                {vehicule.cost_in_credits !== "unknown" && (
                    <button id={vehicule.name} onClick={(event) => handleClick(event, vehicule.name)}> make a reservation </button>
                )}
                {vehicule.cost_in_credits === "unknown" && (
                    <p> this vehicule isn't available </p>
                )}
            </CardWrapper>
        )
    }
    return (
        <Container>
            {listVehicules && (
                <ul>{listVehicules}</ul>

            )}
        </Container>
    )
}

export default Card;
