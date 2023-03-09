import React, { useEffect, useState } from 'react'
import Header from './Header'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CarBanner from './CarBanner'
import { useLocation } from 'react-router-dom'
import { baseUrl } from '../App';
const UserProfile = () => {
const location = useLocation()
const id = location.state.userId

const [user,setUser] = useState({})
const [cars,setCars] = useState([])
useEffect(() => {
    async function getUserProfile() {
        try{
            const res = await fetch(`${baseUrl}/getUserProfile?id=${id}`, {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                }
              })
        
            if(res.status === 201 || res.status === 200){
                
                const data = await res.json()
                setUser(data.user)
                setCars(data.cars)
              }
        } catch(err) {
            console.log(err)
        }
        
    }
    getUserProfile()
},[]) 

  return (
    <div className='myProfile'>
        <Header /> 
        <div className='myProfileContainer' >
            <div className="myProfileHeader">
            {
                  user ? user.image ? <img alt='' className='image' src ={user.image} /> :  <AccountCircleIcon className='image'  sx={{ fontSize: 225, color: '#1A202C' }} /> :  <AccountCircleIcon className='image'  sx={{ fontSize: 108, color: '#1A202C' }} />
                
            }


                {/* <img className='image' src={av1} /> */}
                <div className="userInfoContainer">
                    <div className='userInfoName' >
                    <h5>Name :</h5> 
                    <h4>{user ? user.name : null}</h4>
                    </div>
                    <div className='userInfoEmail' >
                    <h5>Email :</h5> 
                    <h4>{user ? user.email : null}</h4>
                    </div>  
                </div>
            </div>
            <div className='myCars'><h4>Cars</h4></div>
            <div className="body">
                    {
                         cars ? cars.map(myCar => {
                            return <CarBanner car={myCar} isFavourite={false} />
                        }) : null 
                    }
            </div>
            
        </div>
    </div>
  )
}

export default UserProfile