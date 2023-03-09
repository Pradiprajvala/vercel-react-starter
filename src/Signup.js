import React, { useRef, useState } from 'react'
import Header from './components/Header'
import './styles/Signup.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom'
import { baseUrl } from './App';
const Signup = () => {
  const navigate = useNavigate()
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const confirmPasswordRef = useRef(null)
  const [image,setImage] = useState()
  const [user,setUser] = useState({})
  console.log('state', user)
  console.log('image',image)
 let myImage = image;
  const imageHandler = (event) => {
    const reader = new FileReader();
    
    reader.onload = () => {
      if(reader.readyState === 2){
        myImage = reader.result
        setImage(reader.result)
        // console.log(reader.result);   
      }
    }
    reader.readAsDataURL(event.target.files[0])
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(myImage);
    const myUser = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
      image: myImage
    }

    setUser(myUser);

    const { name, email, password, confirmPassword, image } = myUser;
    console.log(JSON.stringify({
        name, email, password, confirmPassword
      }))
      if(!myImage) {
        alert('image not selected')
        return
      }
    
    
    try {
      const res = await fetch(baseUrl + '/register', {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        name, email, password, confirmPassword, image
      })
    });
    console.log(res)
   
  
    
    if(res.status === 422 || !res){
      window.alert('invalid registeration')
    } else {
      window.alert("Registration Sucess");
      navigate('/login')
    }
    } catch(err) {
      console.log(err)
    }
    
    
    return
    
  }
  return (
    <div className='register'>
        <Header />
        <div className='register__container'>
            <h2>Sign Up</h2>
            
            <form onSubmit={handleSubmit} method='POST'>
            {
              image ? <img src={image} alt='' /> : <AccountCircleIcon htmlFor="inputProfileImage" className='avatarr' sx={{ fontSize: 108, color: '#1A202C' }} />
            }
              <input className='imageInput'
          type="file"
          name="profileImage"
          id="inputProfileImage" 
          accept='image/*'      
          onChange={imageHandler} />
              <label htmlFor="inputProfileImage">Select Image</label>
              <div className='inputItem'>
              <h5>Name :</h5>
              <input type="text" name='name' ref={nameRef} id='name' placeholder='ie, John ' required/>
              </div>
              <div className='inputItem'>
              <h5>Email :</h5>
              <input type="email" name='email' ref={emailRef} id='email' placeholder='ie, abc@gmail.com' required/>
              </div>
              <div className='inputItem'>
              <h5>Password :</h5>
              <input type="password" name='password' ref={passwordRef} id='password' placeholder='Password' required/>
              </div>
              <div className='inputItem'>
              <h5>Confirm Password :</h5>
              <input type="password" name='name' ref={confirmPasswordRef} id='confirmPassword' placeholder='Confirm Password' required/>
              </div>
              <button  className='postCarButton'>Upload</button>
            </form>

        </div>
    </div>
  )
}

export default Signup