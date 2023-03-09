import React, {useRef} from 'react'
import Header from './components/Header'
import './styles/Login.css'
import { useNavigate } from 'react-router-dom'
import { useDataLayerValue } from './DataLayers/DataLayer'
import { baseUrl } from './App'
const Login = () => {
  const [,dispatch] = useDataLayerValue();
  const navigate = useNavigate()
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const loginCredentials = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }
    try {
        const res = await fetch(baseUrl + '/login', {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({
            ...loginCredentials
        })
    })

    if(res.status === 400 || !res){
        window.alert('invalid credentials')
    } else {
        const user = await res.json()
        const token = user.token
        document.cookie = `jwtoken=${token}`
        dispatch({
          type: 'SET_USER',
          user: user.user
        })
        alert('login sucess')

        navigate('/')
    }
    } catch(err) { 
        console.log(err);
    }
    
    return
  }
  return (
    <div className='login'>
        <Header />
        <div className='login__container'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              
              <div className='inputItem'>
              <h5>Email :</h5>
              <input type="email" name='email' ref={emailRef} id='email' placeholder='ie, abc@gmail.com' required/>
              </div>
              <div className='inputItem'>
              <h5>Password :</h5>
              <input type="password" name='password' ref={passwordRef} id='password' placeholder='Password' required/>
              </div>
              
              <button  className='postCarButton'>Upload</button>
            </form>
        </div>
    </div>
  )
}

export default Login