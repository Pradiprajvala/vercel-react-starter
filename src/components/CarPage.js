import React from 'react'
import Header from './Header'
import "../styles/CarPage.css"
import { useLocation, useNavigate } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { baseUrl } from '../App';
const CarPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const car = location.state.car
  const isFavourite = location.state.isFavourite
  const {_id,name,company,catagory,images,transmission,passengerCapacity,fuel,price,ownerId, liftFrom, dropTo} = car

  const sendCarRequest = async () => {
    try {

      const res = await fetch(baseUrl + '/sendLiftRequest', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        // credentials: "include",
        body: JSON.stringify({
          ownerId: ownerId,
          carId: _id,
        }) 
      })
      if(res.status === 401){
      alert('Plaese Login First')
      navigate('/login')
    } else if(res.status === 500){
      alert('Server Error, Could not send requests')
    } else if(res.status === 201) {
      alert('Sent Request Successfully')
    } else {
      console.log(res)
    }
    } catch(err) {
      console.log(err)
    }
    return
  }
  return (
    <div className='carPage'>
        <Header />
        <div className="carPage__carContainer">
          <div className='carContainer'>
            <div className='imageContainer'>
              <img src={images[0]} alt='' /> 
            </div>
            <div className='carInfo'> 
              <div className='carInfoHeader'>
                <h5>{name}</h5><h4>{company}</h4>
                {
                  isFavourite ? <FavoriteIcon className='carInfoHeaderFavIcon' style={{color: 'red'}} /> : <FavoriteBorderIcon className='carInfoHeaderFavIcon' style={{color: '#90A3BF'}} />
                }
              </div>
              <h5>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui error fugit dolores veritatis blanditiis asperiores animi consequuntur totam sed dicta?</h5>
          
              <div className="grid">

                <div className='gridItem'>From: <p>{liftFrom}</p></div>
                <div className='gridItem'>To: <p>{dropTo}</p></div>
                <div className='gridItem'>Type: <p>{catagory}</p></div>
                <div className='gridItem'>Capacity: <p>{passengerCapacity} persons</p></div>
                <div className='gridItem'>Transmission: <p>{transmission}</p></div>
                <div className='gridItem'>Fuel: <p>{fuel}</p></div>
                
              </div>
              <div className="carInfoFooter">
                <div className='cb__footerPrice'>
                <h4>${price}/</h4>
                <p>day</p>
              </div>
              <button onClick={sendCarRequest}>Send Request</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default CarPage