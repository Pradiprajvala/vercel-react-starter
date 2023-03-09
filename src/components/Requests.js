import React from 'react'
import Header from './Header'
import '../styles/Requests.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import SingleRequest from './SingleRequest'
import Loading from './Loading'
import { baseUrl } from '../App'
const Requests = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const myRequests = location.state.user.user ? location.state.user.user.requestsToMe : null
    const myRequestsByMe = location.state.user.user ? location.state.user.user.requestsByMe : null 
    const [isLoading,setIsLoading] = useState(false)
    const [requests, setRequests] = useState([])
    const [requestsByMe, setRequestsByMe] = useState([])
    const token = document.cookie.split('=')[1]
    useEffect(() => {
        async function getRequests() {
            setIsLoading(true)
            // console.log(location.state.user)
            try {
                const res = await fetch(baseUrl + '/getRequests', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    },
                    body: JSON.stringify({
                        jwtoken: token
                    }),
                    credentials: "include"
                })
                if (res.status === 401) {
                    navigate('/login')
                } else if (res.status === 200) {
                    const data = await res.json()
                    setRequests(data)
                }
                setIsLoading(false)
            } catch (err) {
                console.log(err)
            }
        }

        async function getRequestsByMe() {
            setIsLoading(true)
            try {
                const res = await fetch(baseUrl + '/getRequestsByMe', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    },
                    body: JSON.stringify({
                        jwtoken: token
                    }),
                    credentials: "include"
                })
                if (res.status === 401) {
                    navigate('/login')
                } else if (res.status === 200) {
                    const data = await res.json()
                    setRequestsByMe(data)
                }
            } catch (err) {
                console.log(err)
            }
            setIsLoading(false)
        }
        getRequests()
        getRequestsByMe()
    }, [])
    return (
        <div className='requests'>
            <Header />
            {
                isLoading ? <Loading />  : <> <div className="requestsContainer">
                <h4>Lift Requests</h4>
                <div className="request">
                    {
                        myRequests && myRequests.map(myRequest => {
                            const requestCar = requests ? requests.car ? requests.car.filter(singleCar => myRequest.carId === singleCar._id) : null : null;
                            const requestSender = requests ? requests.sender ? requests.sender.filter(singleSender => myRequest.userId === singleSender._id) : null : null;
                            return requestCar && requestSender ? <>
                                <SingleRequest requestCar={requestCar[0]} requestSender={requestSender[0]} requestId={myRequest._id} isApproved={myRequest.isApproved} />
                            </> : <></>
                        })
                    }
                </div>
            </div>
            <div className="requestsContainer">
                <h4>Requests from You</h4>
                <div className="request">
                    {
                        
                        myRequestsByMe && myRequestsByMe.map(myRequest => {
                            const requestCar = requestsByMe ? requestsByMe.car ? requestsByMe.car.filter(singleCar => myRequest.carId === singleCar._id) : null : null;
                            const requestSender = requestsByMe ? requestsByMe.owner ? requestsByMe.owner.filter(singleOwner => myRequest.ownerId === singleOwner._id) : null : null;
                            return requestCar && requestSender ? <>
                                <SingleRequest requestCar={requestCar[0]} requestSender={requestSender[0]} requestId={myRequest._id} isApproved={myRequest.isApproved} byMe={true} />
                            </> : <></>
                        })
                    }
                </div>
            </div>
            </>
            }
            
            
        </div>
    )
}

export default Requests