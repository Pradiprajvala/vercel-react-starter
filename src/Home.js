import Header from './components/Header'
import './Home.css';
import React, { useEffect } from 'react'
import Body from './components/Body'
import Sidebar from './components/Sidebar';
import { useDataLayerValue } from './DataLayers/DataLayer';
import { baseUrl } from './App';

const token = document.cookie.split('=')[1]
console.log(token)

function Home() {
  console.log('hello');
  const [,dispatch] = useDataLayerValue()
  console.log('hello');
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(baseUrl + '/getCurrentUser', {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              jwtoken: token
            })
        })
        if(res){
          const user = await res.json()
          dispatch({
            type: 'SET_USER',
            user: user
          })
        } else {
          console.log('no user')
        }

      } catch (err) {
        console.log('error fetching user',err)
      }
    }
    
    fetchUser()
  },[])
  return (
    <>
     
      <div className="app">
      <Header />
        <div className='content'>
        <Sidebar />
        <Body />
        </div>
      </div>
    </>
  );
}

export default Home;