import React from 'react'
import styled from 'styled-components'

import Modal from '../Components/Modal'
import img from '../../assets/starfighter.jpeg'
import bgimg from '../../assets/galaxy.jpg'
// STYLE -
const StyledTitle = styled.h1`
  color: pink;
  display: inline-block;
  font-size: 2em;
  height: 30%;
  margin: 15px 0 0 20px;
`
const CardWrapper = styled.div`
  font-size: 0.5em;
  background-image: url(${bgimg});
  background-size: cover;
  margin: 20px;
  border-radius: 30px;
  flex-direction: column;
  display: flex;

  @media screen and (min-width: 1200px) {
    position: relative;
    flex-wrap: wrap;
    min-width: 25%;
    max-width: 16vw;
    min-height: 30vh;
    width: fit-content;
    height: fit-content;
  }
  @media screen and (max-width: 1200px) {
    width: 100%;
    height: fit-content;
    position: relative;
    left: 10%;
  }
`
const StyledImage = styled.img`
  position: relative;
  align-self: center;
  border-radius: 30px;
  margin: 20px;
  @media screen and (max-width: 1200px) {
    height: 150px;
    width: 150px;
  }
  @media screen and (min-width: 1200px) {
    height: 100px;
    width: 100px;
  }
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
`

const NotAvailable = styled.div`
  background-color: red;
  color: black;
  width: fit-content;
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
`

// eslint-disable-next-line react/prop-types
function Vehicles ({ currentVehicles, loading }) {
  return (
    <>
      {loading && <h1> Loading.... </h1>}
      {/* eslint-disable-next-line react/prop-types */}
      {currentVehicles?.map((vehicle) => {
        return (
          <CardWrapper key={`${vehicle.name}wrapper`}>
            <StyledTitle>
              {vehicle.name}
              {vehicle.cost_in_credits === 'unknown' && (
                <NotAvailable> Not available</NotAvailable>
              )}
            </StyledTitle>
            <StyledImage src={img} id={`${vehicle.name}img`} />
            <Modal vehicle={vehicle} />
          </CardWrapper>
        )
      })}
    </>
  )
}

export default Vehicles
