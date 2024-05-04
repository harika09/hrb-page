import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo from '../Images/LOGO NEW.png'
import Swal from "sweetalert2";
import axios from "axios";
import './Register.css'

function Register() {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userName, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [ipAddress, setIPAddress] = useState('')


  const errorMessage = (message)=>{
    Swal.fire({
      position: "center",
      icon: "error",
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  const successMessage = (message)=>{
    Swal.fire({
      position: "center",
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  const getIPAddress = async()=>{
    const res= await axios.get('https://geolocation-db.com/json/')
    setIPAddress(res.data.IPv4)
  }

  const RegisterBtn = (e) => {
    e.preventDefault();
    axios.post('https://backend-d9o6.onrender.com/api/auth/register',{
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      email: email,
      password: password,
      ip: ipAddress
    }).then((response) => {
      
      if (response.data.error) {
        errorMessage(response.data.error)
        
      } else {
        successMessage(response.data.success)
        localStorage.setItem("Token", response.data.token);
        navigate('/dashboard')
      }
    });
  }

  useEffect(()=>{
    getIPAddress()
  }, [])

  useEffect(()=>{
    const token = localStorage.getItem('Token')
    if(token){
      navigate('/dashboard')
    }
      
  })

  return (
    <div className='register-container'>
        <div className='register-content bd-container'>
        
            <div className='register-form-content'>
            <img src={Logo} alt="logo" />
            <h2>Welcome to HRB</h2>
              <form className="form-wrapper" onSubmit={RegisterBtn}>
              <label htmlFor="Email">Email</label>
                <input type="email" placeholder='Enter Email' maxLength="70" value={email} onChange={(e)=>{setEmail(e.target.value)}} />

                <label htmlFor="username">Username</label>
                <input type="text" placeholder='Enter Last Name' maxLength="50" value={userName} onChange={(e)=>{setUsername(e.target.value)}} />

                <label htmlFor="firstName">First Name</label>
                <input type="text" placeholder='Enter First Name' maxLength="50" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} />

                <label htmlFor="lastName">Last Name</label>
                <input type="text" placeholder='Enter Last Name' maxLength="50" value={lastName} onChange={(e)=>{setLastName(e.target.value)}} />

                <label htmlFor="pasword">Password</label>
                <input type="password" placeholder='Enter Password' maxLength="30" value={password} onChange={(e)=>{setPassword(e.target.value)}} />

                <input type="submit" value="Register" className="btn-reg"/>
              
              
                <div className="lower-form-content">
                  <div className="forgot-password">
                    {/* <Link to=''>Forgot Password?</Link> */}
                  </div>
    
                  <div className="register-form">
                    <span>Already have an account ? </span>
                    
                    <Link to='/' className="link">
                      Here
                    </Link>
                  </div>
                </div>
              </form>   
            </div>
           
        </div>
    </div>
  )
}

export default Register
