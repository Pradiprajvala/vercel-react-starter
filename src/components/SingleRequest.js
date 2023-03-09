import React, { useState } from 'react'
import '../styles/SingleRequest.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../App';
const SingleRequest = ({requestCar,requestSender, requestId, isApproved, byMe}) => {
    const nevigate = useNavigate()
    const {name,_id,image} = requestSender;
    const {liftFrom,dropTo,price} = requestCar
    const carId = requestCar._id
    const carName = requestCar.name
    const [ approved, setApproved ] = useState(isApproved)

    const openProfile = () => {
        nevigate('/userProfile', {state: {userId: _id}})
    }

    const openCar = () => {
        nevigate('/carPage', {state: {car: requestCar}})
    }

    const acceptRequest = async () => {
        try {
            const res = await fetch(baseUrl + '/acceptRequest', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    requestId,
                    userId: _id,
                    carId
                }),
                credentials: "include"
            })

            if(res.status === 403){
                alert('not login')
            } else if(res.status === 201){
                alert('accepted')
                setApproved(true)
            } else {
                alert('could not accept')
            }

            const data = res.json()
            console.log(data)

        } catch(err) {
            console.log(err)
        }
    }

    return (
    <div className='singleRequest'>
       {
        image ? <img alt='' className='avatar' src={image} ></img> : <AccountCircleIcon className='avatar' sx={{ fontSize: 44, color: '#1A202C' }} />
       }
       <div className='singleRequestMiddle' >
            <div className='sr__middleHeader'><h4>{name}</h4> for <h5>{carName}</h5></div>
            <div className='sr__middleFooter'>from:<h4>{liftFrom}</h4> To:<h4>{dropTo}</h4></div>
        </div>
        
        <p onClick={openProfile}>View Profile</p>
        {
            byMe ? <h4 className='viewCar' onClick={openCar}>View Car</h4> : <></>
        } 
        <div className='sr__rightPrice'>
            <h4>${price}/-</h4>
        </div> 
            
      {
        approved ? <button className='acceptedButton'>Accepted</button> : byMe ? <button className='acceptButtonByMe'>Not Accepted Yet</button> :  <button className='acceptButton' onClick={acceptRequest}>Accept</button>
      }
        
    </div>
  )
}

export default SingleRequest
//22 23