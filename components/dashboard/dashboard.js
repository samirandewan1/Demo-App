import React from 'react'
import CountryGrid from '../country/countrygrid'
import CountrySearchBox from '../search/search'

const Dashboard = ({squery,rquery}) => {
  return (
    <>
      <CountrySearchBox/>
      <CountryGrid squery={squery} rquery={rquery}/>
    </>
  )
}

export default Dashboard
