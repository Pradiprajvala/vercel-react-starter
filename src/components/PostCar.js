import React, {useState, useRef} from 'react'
import '../styles/PostCar.css'
import SelectCar from '../assets/CarImages/selectCarImage.jpg'
import Header from './Header'
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../App';
function PostCar() {

  const token = document.cookie.split('=')[1]
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  
  const nameRef = useRef(null)
  const companyRef = useRef(null)
  const fuelPetrolRef = useRef(null)
  const fuelDieselRef = useRef(null)
  const capacityRef = useRef(null)
  const transmissionModeAutoRef = useRef(null)
  const transmissionModeManualRef = useRef(null)
  const tCapacity = useRef(null)
  const catagoryRef = useRef(null)
  const economyRef = useRef(null)
  const priceRef = useRef(null)
  const fromRef = useRef(null)
  const toRef = useRef(null)

  const imageHandler = (event) => {
      const reader = new FileReader();
      
      reader.onload = () => {
        if(reader.readyState === 2){
          setImage(reader.result)
          console.log(reader.result);   
        }
      }
      reader.readAsDataURL(event.target.files[0])
  }

  // useEffect(()=> {
  //   console.log('car',car);
  // },[car])
  
  const handleSubmit = async (e) => {
        e.preventDefault();
       
    if(!transmissionModeAutoRef.current.checked && !transmissionModeManualRef.current.checked){
      alert('please select mode of transmission')
      return
    }
    if(!fuelDieselRef.current.checked && !fuelPetrolRef.current.checked){
      alert('please select type of fuel')
      return
    }
    if(!image){
      alert('please select car')
      return
    }
    const state = {
      name:  nameRef.current.value,
      company: companyRef.current.value,
      fuel: fuelPetrolRef.current.checked ? 'Petrol' : 'Diesel' ,
      passengerCapacity: capacityRef.current.value,
      transmission: transmissionModeAutoRef.current.checked ?  'Auto' : 'Manual',
      
      tankCapacity: tCapacity.current.value,
      images: [image],
      catagory: catagoryRef.current.value,
      price: priceRef.current.value,
      economy: economyRef.current.value,
      liftFrom: fromRef.current.value,
      dropTo: toRef.current.value
    }

    // dispatch({
    //   type: 'ADD_CAR',
    //   car: state
    // });

    try {
       const res = await fetch(baseUrl + '/postCar', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      // credentials: "include",
      body: JSON.stringify({
        ...state,
        jwtoken: token
      
      })
    })
    if(res.status === 401 || !res){
      alert('Plaese Login First')
      navigate('/login')
    } else if(res.status !== 201){
      alert('Could not post car')
    } else {
      alert('Car Posted Successfully')
      navigate('/')
    }
  } catch(err) {
    console.log(err)
  }
   
  return


    

  }
  
  return (
    <div className='postCar'>
       <Header />
      <div className="container">
         
         <div className='containerGrid'>
         <div className='imageSelector'>
         <img alt='' src={ image ? image : SelectCar} />
         <input className='imageInput'
          type="file"
          name="carImage"
          id="inputCarImage" 
          accept='image/*'      
          onChange={imageHandler} />
          <label htmlFor="inputCarImage" className='uploadButton' >
            <p>Select Image</p>
          </label>
          </div>
          <div className='carDescription'>
            <h4>Car Info</h4>
            <form onSubmit={handleSubmit}>
              <div className='inputItem'>
              <h5>Name :</h5>
              <input type="text" name='name' ref={nameRef} id='name' placeholder='ie, Swift Desire' required/>
              </div>
              <div className='inputItem'>
              <h5>Lift From :</h5>
              <input type="text" name='from' ref={fromRef} id='from' placeholder='ie, SVNIT College, Surat' required/>
              </div>
              <div className='inputItem'>
              <h5>Drop At :</h5>
              <input type="text" name='to' ref={toRef} id='to' placeholder='ie, Athwagate, Surat' required/>
              </div>
              <div className='inputItem'>
              <h5>Catagory :</h5>
              <input type="text" name='catagory' ref={catagoryRef} id='catagory' placeholder='ie, Hatchback' required/>
              </div>
              <div className='inputItem'>
              <h5>Company :</h5>
              <input type="text" name='companyName' ref={companyRef} id='companyName' placeholder='ie, Maruti Suzuki' required/>
              </div>
              <div className='inputItem capacity'>
              <h5>Passanger Capacity :</h5>
              <div className='capacityInput'><input type="number" name='capacity' ref={capacityRef} id='name' min='1' max='20' placeholder='ie, 5' required/><p>People</p> </div>
              </div>
              <div className='inputItem'>
              <h5>Transmission :</h5>
              <div className='radioInput'>
              <input type="radio" ref={transmissionModeAutoRef} name='transmission' id='auto' value="auto"/>
              <label htmlFor="auto">Auto</label>
              
              <input type="radio" ref={transmissionModeManualRef} name='transmission' id='manual' value="manual"/>
              <label htmlFor="manual">Manual</label>
              </div>
              </div>
              <div className='inputItem'>
              <h5>Fuel :</h5>
              <div className='radioInput'>
              <input type="radio" ref={fuelPetrolRef} name='fuel' id='petrol' value="petrol"/>
              <label htmlFor="auto">Petrol</label>
              
              <input type="radio" ref={fuelDieselRef} name='fuel' id='diesel' value="diesel"/>
              <label htmlFor="diesel">Diesel</label>
              </div>
              </div>
              <div className='inputItem'>
              <h5>Tank Capacity :</h5>
              <div className='capacityInput'><input type="number" ref={tCapacity} name='tankCapacity' id='tankCapacity' min="1" placeholder='ie, 70' required/><p>Liters</p> </div> 
              </div>
              <div className='inputItem capacity'>
              <h5>Economy :</h5>
              <div className='capacityInput'><input type="number" name='economy' ref={economyRef} id='name' min='0' placeholder='ie, 15' required/><p>Kms per Liter</p> </div>
              </div>
              <div className='inputItem capacity'>
              <h5>Price :</h5>
              <div className='capacityInput'><input type="number" name='price' ref={priceRef} id='name' min='0' placeholder='ie, 50' required/><p>in $ per day</p> </div>
              </div>
              <button className='postCarButton'>Upload</button>
            </form>
          </div>
          </div>
      </div>
    </div>
  )
}

export default PostCar