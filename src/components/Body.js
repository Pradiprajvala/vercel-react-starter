import React, {useEffect, useState} from 'react'
import '../styles/Body.css'
import CarBanner from './CarBanner'
// import cars from '../data'
import { useDataLayerValue } from '../DataLayers/DataLayer'
import Loading from './Loading';
import { baseUrl } from '../App';
function Body() {
  const [{user, filterCatagory, filterCapacity}] = useDataLayerValue();
  const [isLoading, setIsLoading] = useState(false);
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);

  useEffect( () => {
    async function getCars(){
      setIsLoading(true)
      try {
        const carsRes = await fetch(baseUrl + '/getCars', {
        "method": "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        })
        const data = await carsRes.json()
        setCars(data.cars)
      } catch(err) {
        console.log(err)
      }
      setIsLoading(false)
    }
    getCars()
  }, [])

  useEffect(() => {
    setFilteredCars(cars)
  }, [cars])

  useEffect(() => {
    filterCars()
  }, [filterCatagory, filterCapacity])

  const filterCars = () => {
    console.log(filterCapacity);
    const filteredCarsTemp = cars.filter(car => {
      if(filterCatagory[car.catagory] && (filterCapacity[car.passengerCapacity] || (car.passengerCapacity > 8 && filterCapacity['8']))) {
        return car
      }
    })
    console.log(filteredCarsTemp);
    setFilteredCars(filteredCarsTemp)
  }
  return (
    <div className='body'>
        { 
        isLoading ? <Loading /> :
        filteredCars.map(car => {
            return <CarBanner myFavouriteCars={user ? user.myFavouriteCars : []} car={car} />
          }) 
        } 

    </div>
  )
}

export default Body