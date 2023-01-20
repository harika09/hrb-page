import React, {useEffect, useState} from 'react'
import { useNavigate, Link } from "react-router-dom";
import Logo from '../Images/LOGO NEW.png'
import { HashLoader } from "react-spinners";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import moment from "moment";
import axios from 'axios'
import './Home.css'

function Home() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState({});
  const [licenseKey, setLicenseKey] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const token = localStorage.getItem('Token');
  const currentDate = new Date()

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

  // listKeys()
  if(token){
    const verifyToken = jwt_decode(token);
    if(verifyToken.exp * 1000 < currentDate){
      localStorage.removeItem('Token')
      localStorage.removeItem('User')

      navigate('/register')
    }

  
  }

  const header = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("Token"),
    },
  };

  const submitKey = (e)=>{
    e.preventDefault()
   
    const checkedUserExist = localStorage.getItem("Token");
    if (checkedUserExist) {
      /*  https://secure-brook-87956.herokuapp.com */
      axios.post(
        'https://cautious-dog-gabardine.cyclic.app/api/auth/bind-key',
        {
          key: licenseKey,
        },
        {
          headers: {
            Authorization: "Bearer " + checkedUserExist,
          },
        }
      ).then((res) => {
        if (res.data.error) {
          errorMessage(res.data.error)
        } else {
          setIsLoading(true)
          successMessage(res.data.message)
          
        }
      });
    }

  }


  const logout = ()=>{
    localStorage.clear()
    navigate('/')
  }
 
  
  const resetLicense = async (e)=>{
    e.preventDefault()
    setIsLoading(true)

    const res= await axios.get('https://api.ipify.org')
    
    const checkedUserExist = localStorage.getItem("Token");
    if (checkedUserExist) {
      //console.log(res.data)
      axios.post(
        'https://cautious-dog-gabardine.cyclic.app/api/auth/reset-license',
        {
          ip: res.data,
         
        },
        {
          headers: {
            Authorization: "Bearer " + checkedUserExist,
          },
        }
      ).then((res) => {
        if(res.data.error){
          errorMessage(res.data.error)
        }else{
          console.log(res)
          successMessage(res.data.message)
          
        }
      });
    } 
  }

  useEffect(()=>{
    let componentMounted = true;
    const loadUser = async () => {
      const userInfo = await axios.get("https://cautious-dog-gabardine.cyclic.app/api/auth/profile", header);
      if (componentMounted) {
        
        setTimeout(()=>{
          setProfile(userInfo.data.user)
          setIsLoading(false)
        },2000)
      }
    };
    loadUser();

    return () => {
      componentMounted = false;
    };
  }, [profile])


  useEffect(()=>{
    const token = localStorage.getItem('Token')
    if(!token)
      navigate('/')
  })

  return (
    <div className='home-container'>
      <div className='home-content bd-container'>
      {isLoading ? (
        <div className="loading-animation">
          <HashLoader loading color="#4B5A82" size={75} />
        </div>
      ) : (
       <div className='dashboard-wrapper'>
         {!profile.key ? 
          (<div>
            <form onSubmit={submitKey} className='dashboard-license'>
              <img src={Logo} alt="logo" />
              <h2>Welcome to HRBDashboard</h2>
              <label htmlFor="License">Enter License Key</label>
                <input type="text" placeholder='XXXX-XXXX-XXXX-XXXX' maxLength="24" value={licenseKey} onChange={(e)=>{setLicenseKey(e.target.value)}} />
                <input type="submit" value="Bind License Key" className="btn-license"/>
            </form>

            
          </div>) : (
            <div className='dashboard-content'>
              <img src={Logo} alt="logo" />
              <h2>Welcome to HRB Dashboard</h2>
              <div className='dashboard-top'>
                <p>Username : {profile.userName}</p>
                <p>License Key : {profile.key}</p>
                <p>Activation Date : {moment(profile.createdAt).format("MMM DD, YYYY")}</p>
                
              </div>

              <div className='dasboard-buttom'>
                  <button className='discord-invite' onClick={()=>{window.open('https://discord.gg/8xEpQjtmvu')}}>Join Discord </button>
                  <button className='reset-license'onClick={resetLicense}>Reset License</button>
                  <button className='logout' onClick={logout}> Logout</button>
                </div>
            </div>
          )}
       </div>
      )}

          
         

          
      </div>
    </div>
  )
}

export default Home
