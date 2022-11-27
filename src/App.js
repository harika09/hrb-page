import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LicenseKey from './Components/LicenseKey/LicenseKey';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';


function App() {
  return (
   <Router>
      <Routes>
        <Route path='/dashboard' exact element={<Home/>} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/addKey' element={<LicenseKey/>} />
    </Routes>
   </Router>
  );
}

export default App;
