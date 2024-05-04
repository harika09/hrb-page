import React, {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Logo from '../Images/LOGO NEW.png'
import Swal from 'sweetalert2'
import axios from 'axios'
import './Login.css'

function Login() {
    const navigate = useNavigate()
    const [userName, setUserName]= useState('')
    const [password, setPassword] = useState('')

    const errorMessage=(message)=>{
        Swal.fire({
            position: "center",
            icon: "error",
            title: message,
            showConfirmButton: false,
            timer: 1500,
        });
    }

    const successMessage=(message)=>{
        Swal.fire({
            position: "center",
            icon: "success",
            title: message,
            showConfirmButton: false,
            timer: 1500,
          });
    }

    const Login= (e)=>{
        e.preventDefault()

        axios.post('https://backend-d9o6.onrender.com/api/auth/login',{
            userName: userName,
            password: password
        }).then((res)=>{
            if(res.data.error){
                errorMessage(res.data.error)
            }else{
                successMessage(res.data.success)
                navigate('/dashboard')
                localStorage.setItem('Token', res.data.token)
                localStorage.setItem('userId', res.data.user._id)
            }
        })
    }

    useEffect(()=>{
      const token = localStorage.getItem('Token')
      if(token){
        navigate('/dashboard')
      }
        
    })

  return (
    <div className="login-container">
      <div className="login-content  bd-container">
     
           <div className="login-form-container">

           
           <form className="login-form" onSubmit={Login}>
             <img src={Logo} alt="logo" />
           
           <h2>Welcome to HRB</h2>
             <label htmlFor="username">Username</label>
             <input
               type="text"
               placeholder="Enter Username"
               value={userName}
               maxLength="30"
               onChange={(e) => {
                 setUserName(e.target.value);
               }}
             />
             <label htmlFor="password">Password</label>
             <input
               type="password"
               placeholder="Enter Password"
               value={password}
               maxLength="30"
               autoComplete="off"
               onChange={(e) => {
                 setPassword(e.target.value);
               }}
             />
 
             <input type="submit" value="Login" />
 
             <div className="lower-form-content">
               <div className="forgot-password">
                 {/* <Link to=''>Forgot Password?</Link> */}
               </div>
 
               <div className="register-form">
                 <span>Register an account ? </span>
                 
                 <Link to='/register' className="link">
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

export default Login
