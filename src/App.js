// import Header from './components/Header'
// import './App.css';
// import React from 'react'
// import Body from './components/Body'
// import Sidebar from './components/Sidebar';
// function App() {
//   return (
//     <>
//       <div className="app">
//         <div className='content'>
//         <Sidebar />
//         <Body />
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;


import React from 'react';
import './index.css';
import Home from './Home';
import PostCar from './components/PostCar'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './Signup';
import Login from './Login'
import CarPage from './components/CarPage';
import Requests from './components/Requests';
import MyProfile from './components/MyProfile';
import UserProfile from './components/UserProfile';
// export const baseUrl = 'http://localhost:5001/api';
export const baseUrl = 'https://api-liftme.up.railway.app/api';
const App = () => {
  return (
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}/>
        <Route path='/postcar' element={<PostCar />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/carPage' element={<CarPage />} />
        <Route path='/requests' element={<Requests />} />
        <Route path='/myProfile' element={<MyProfile />} />
        <Route path='/userProfile' element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
export default App;
