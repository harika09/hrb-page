import React, { useState } from 'react'
import axios from 'axios'

function LicenseKey() {
    const [key, setKey]= useState('')


    const insertKey = (e)=>{
        e.preventDefault()
    
        axios.post('https://hrb-api.onrender.com/api/auth/key', {
            key: key
        })

    }

  return (
    <div>
      <form onSubmit={insertKey}>
        <input type="text" placeholder='Insert Key Here' value={key} onChange={(e)=>{setKey(e.target.value)}} />
        <input type="submit" value='Submit' />
      </form>
    </div>
  )
}

export default LicenseKey
