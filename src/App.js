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
import {BrowserRouter,Routes,Route} from 'react-router-dom'

// export const baseUrl = 'http://localhost:5001/api';
export const baseUrl = 'https://api-liftme.up.railway.app/api';
const App = () => {
  return (
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
export default App;
