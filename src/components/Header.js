import React from 'react'
import '../styles/Header.css'
import CarentLogo from '../assets/CarentLogo.svg'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import { useDataLayerValue } from '../DataLayers/DataLayer';
import { useNavigate } from 'react-router-dom';

function Header () {
    const nevigate = useNavigate()
    const [{user}] = useDataLayerValue()
    const loginClickHandler = () => {
        nevigate('/login')
    }

    const seeMyRequests = () => {
        if(user){
            console.log(user)
            nevigate('/requests', {state: {user}})
        } else {
            nevigate('/login')
        }
    }

    const seeMyProfile = () => {
        if(user){
            nevigate('/myProfile')
        } else {
            nevigate('/login')
        }
    }
  return (
    <div className="header">
        <img className="header__logo" onClick={() => {
            nevigate('/')
        }} src={CarentLogo} alt=''/>
        <div className='header__content'>
            <div className="header__middle">
                <div className="search__container">
                    <SearchIcon sx={{ fontSize: 24 }}/>
                    <input className='header__search' type="text" placeholder='Search something here'/>
                    <TuneIcon sx={{ fontSize: 24 }}/> 
                </div>
            </div>
            <div className='header__right'>
                
                <FavoriteIcon sx={{ fontSize: 24 }} className='header__feature' />
                <NotificationsIcon onClick={seeMyRequests} sx={{ fontSize: 24 }} className='header__feature'/>
                <SettingsIcon sx={{ fontSize: 24 }} className='header__feature'/>
                {
                    !user ? <button onClick={loginClickHandler}>Login</button> : user.user && user.user.image ? <img alt='' className='header__avatar' onClick={seeMyProfile} src={user.user.image} sx={{ fontSize: 44}}></img> : <AccountCircleIcon onClick={seeMyProfile} className='header__avatar' sx={{ fontSize: 44, color: '#1A202C' }} />
                }
                
            </div>  
        </div>  
    </div>
  )
}

export default Header