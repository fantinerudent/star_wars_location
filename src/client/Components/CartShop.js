import React, { useContext } from 'react'
import CartShoppingContext from '../Contexts/CartShopping'
import styled from 'styled-components'

const Container = styled.div`
  @media screen and (min-width: 1200px) {
    height: 100vh;
    width: 20%;
    position: fixed;
    top: 0;
    right: 0;
    overflow: scroll;
    border-left: 2px white solid;
    padding-left: 10px;
  }
  @media screen and (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    position: relative;
    height: 20%;
    width: 90vw;
    align-content: center;
    border: 3px solid white;
    & > h2 {
      position: relative;
      margin: 0 20px;
    }
  }
  & > h2 {
    color: red;
  }
  font-size: 1.6vw;
  color: white;
  background-color: black;
`

const TitleDisplay = styled.span`
  font-size: 1.5vw;
  color: yellow;
  font-weight: bold;
`

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
`

const ItemContainer = styled.div`
  @media screen and (min-width: 1200px) {
    margin-bottom: 10px;
  }
  @media screen and (max-width: 1200px) {
    margin: 10px 10px 0px 20px;
  }
  border: yellow 2px solid;
  position: relative;
  width: 85%;
  padding: 10px;
  border-radius: 10px;
`

function CartShop () {
  const { cartShopping } = useContext(CartShoppingContext)

  let sum = 0
  if (cartShopping) {
    for (let i = 0; i < cartShopping.length; i++) {
      sum += Number(cartShopping[i][0].cost_in_credits)
    }
  }

  return (
    <Container>
      <h2> CARTSHOP :</h2>
      {cartShopping &&
        cartShopping.map((vehicle) => {
          return (
            <ItemContainer key={`${vehicle[0].name}key`}>
              <TitleDisplay>name:</TitleDisplay> {vehicle[0].name}
              <br />
              <TitleDisplay>model:</TitleDisplay> {vehicle[0].model}
              <br />
              <TitleDisplay>crew:</TitleDisplay> {vehicle[0].crew}
              <br />
              <TitleDisplay>passengers:</TitleDisplay> {vehicle[0].passengers}
              <br />
              <TitleDisplay>price:</TitleDisplay> {vehicle[0].cost_in_credits}
              <br />
            </ItemContainer>
          )
        })}
      <Sum> Total : {sum}$ </Sum>
    </Container>
  )
}

export default CartShop
