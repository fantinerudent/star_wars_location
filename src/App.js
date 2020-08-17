import React, { useState, useMemo, useEffect } from 'react'
import axios from 'axios'
import { CartShoppingProvider } from './client/Contexts/CartShopping'
import Vehicles from './client/Components/Vehicles'
import Header from './client/Components/Header'
import Pagination from './client/Components/Pagination'
import CartShop from './client/Components/CartShop'

import styled from 'styled-components'
import './App.css'

const VehiclesContainer = styled.div`
  @media screen and (min-width: 1200px) {
    display: flex;
    flex-wrap: wrap;
    height: 85vh;
    max-width: 85vw;
  }
  @media screen and (max-width: 1200px) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 80vw;
  }
`

function App () {
  const [cartShopping, setCartShopping] = useState([])
  const [listOfVehicles, setListOfVehicles] = useState([])
  const [totalNumberOfVehicles, setTotalNumberOfVehicles] = useState()
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const vehiclesPerPage = 6

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true)
      const arrayOfVehicles = []
      const resPage1 = await axios.get('https://swapi.dev/api/vehicles/?page=1')
      const resPage2 = await axios.get('https://swapi.dev/api/vehicles/?page=2')
      const resPage3 = await axios.get('https://swapi.dev/api/vehicles/?page=3')
      const resPage4 = await axios.get('https://swapi.dev/api/vehicles/?page=4')

      Promise.all([resPage1, resPage2, resPage3, resPage4]).then((values) => {
        for (let i = 0; i < values.length; i++) {
          values[i].data.results.map((vehicle) => {
            { vehicle.booked = false
              arrayOfVehicles.push(vehicle) }
          })
        }
        setListOfVehicles(arrayOfVehicles)
        setTotalNumberOfVehicles(arrayOfVehicles.length)
        setLoading(false)
      })
    }

    fetchVehicles()
  }, [])

  const providerValue = useMemo(
    () => ({
      cartShopping,
      setCartShopping,
      setCurrentPage,
      listOfVehicles,
      loading,
      setLoading
    }),
    [setCartShopping, cartShopping, listOfVehicles, loading]
  )

  const indexOfLastVehicle = currentPage * vehiclesPerPage
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage
  const currentVehicles = listOfVehicles?.slice(
    indexOfFirstVehicle,
    indexOfLastVehicle
  )

  return (
    <CartShoppingProvider value={providerValue}>
      <Header />
      <CartShop />
      <VehiclesContainer>
        <Vehicles currentVehicles={currentVehicles} loading={loading} />
        <Pagination
          vehiclesPerPage={vehiclesPerPage}
          totalNumberOfVehicles={totalNumberOfVehicles}
        />
      </VehiclesContainer>
    </CartShoppingProvider>
  )
}

export default App
