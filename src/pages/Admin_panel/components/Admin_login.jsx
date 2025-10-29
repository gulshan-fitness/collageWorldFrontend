

import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"

import { Link, useNavigate } from 'react-router-dom'

import { Context } from '../../../Context_holder'






export default function Admin_login() {

  const {setadmin,settoken,notify}=useContext(Context)

   
    const navigator= useNavigate()


    const submitloginhandler=(e)=>{

      e.preventDefault()
   
      const email= e.target.email.value
     
      const password= e.target.password.value
     const data={
        email:email,
        password:password,
     }
      

      axios.post(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_ADMIN_URL}login`, data)
      .then((response) => {
        notify(response.data.msg,response.data.status)
       
  
        if (response.data.status === 1) {
          

            setadmin(response.data.admin)

            settoken(response.data.token)
            
            localStorage.setItem("admin",JSON.stringify(response.data.admin))
            localStorage.setItem("token",response.data.token)


            navigator("/admin")

        }
      })
      .catch((error) => {
         
        
        
        })
      

  
      

    }

  return (
    <div className="min-h-screen flex items-center justify-center py-10  bg-slate-300 ">
        
      
        <div>
          <div className='flex justify-center mb-5'> 
          <Link to={"/"}><img src="/image/iSHOP Logo.svg" alt=""  className=''/></Link>
          
          </div>
       
        <div className="bg-white p-8 rounded-md shadow-md w-96 border">
    <div className='flex justify-center'>
        <i class="fa-solid fa-user text-6xl mb-3" ></i>
        </div>
      <h2 className="text-xl font-semibold mb-6 text-center uppercase">Admin Login</h2>


      <form onSubmit={submitloginhandler}>
        
        
      
      <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          
          />
        </div>
      

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            
          />
        </div>

      
     
        <div className="">
          <button
            type="submit"
            className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4
             rounded focus:outline-none focus:shadow-outline"
          > Login
          
           
          </button>
 
          
        </div>
      </form>


    </div>
        </div>

      
    
  </div>

  )
}






