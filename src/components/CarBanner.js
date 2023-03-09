import React, { useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import '../styles/CarBanner.css'
// import car from '../assets/CarImages/car2.jpg'
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import WifiProtectedSetupIcon from '@mui/icons-material/WifiProtectedSetup';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useNavigate } from  'react-router-dom'
import { baseUrl } from '../App';

const token = document.cookie.split('=')[1]
function CarBanner({myFavouriteCars, car}) {
  const navigate = useNavigate();
  const {_id,name,catagory,images,transmission,passengerCapacity,tankCapacity,price, liftFrom, dropTo} = car
  const isFavourite = myFavouriteCars ? myFavouriteCars.includes(_id) : false;
  const [isFavouriteState, setIsFavouriteState] = useState(isFavourite)
  const clickhandler = () => {
    navigate('/carPage', {state: {car}})
  }
  
  const makeFavourite =  async (e) => {
    e.stopPropagation();
    setIsFavouriteState(true)
    try {
      const res = await fetch(baseUrl+ '/postLikeDislike',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "applicatino/json"
        },
        body: JSON.stringify({
          isFavourite: true,
          carId: _id,
          jwtoken: token
        }),
        credentials: "include"
      })

      if(res.status === 401){
        alert('please login first')
        setIsFavouriteState(false)
        navigate('login')
      } else if(res.status === 201){
        setIsFavouriteState(true)
        alert('liked')
      } else {
        setIsFavouriteState(false)
      }
    } catch(err) {
      setIsFavouriteState(false)
    }
  }

  
  const removeFavourite =  async (e) => {
    e.stopPropagation();
    setIsFavouriteState(false)
    try {
      const res = await fetch(baseUrl + '/postLikeDislike',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "applicatino/json"
        },
        body: JSON.stringify({
          isFavourite: false,
          carId: _id,
          jwtoken: token
        }),
        credentials: "include"
      })

      if(res.status === 401){
        setIsFavouriteState(true)
        alert('please login first')
        navigate('login')
      } else if(res.status === 201){
        setIsFavouriteState(false)
        alert('removed like')
      } else {
        setIsFavouriteState(true)
      }
    } catch(err) {
      setIsFavouriteState(true)
      console.log(err)
    }
  }
  return (
    <div className="carBanner" onClick={clickhandler}>
        <div className="cb__header">
          <div className='cb__carTitle'> 
            <h4>{name}</h4>
            <p>{catagory}</p>
          </div>
          {
            isFavouriteState ? <FavoriteIcon onClick={removeFavourite} className='cb__headerFavIcon' style={{color: 'red'}} /> : <FavoriteBorderIcon onClick={makeFavourite} className='cb__headerFavIcon' style={{color: '#90A3BF'}} />
          }
        </div >
        
        <img src={images[0]} alt=''/>
        <div className="cb__footer">
        <div className="cb__location">
          <div className="from"><h4>From:</h4> <p>{liftFrom}</p></div>
          <div className="to"><h4>To:</h4> <p>{dropTo}</p></div>         
        </div>
        <div className="cb__carDesc">
          <LocalGasStationIcon />
          <h4>{tankCapacity}L</h4>
          <WifiProtectedSetupIcon />
          <h4>{transmission}</h4>
          <PeopleAltIcon />
          <h4>{passengerCapacity}Person</h4>
        </div>
        <div className='cb__footerBottom'>
          <div className='cb__footerPrice'>
            <h4>${price}/-</h4>
          </div>
          <button>Rent Now</button>
          </div>
        </div>
  
    </div>
  )
}

export default CarBanner