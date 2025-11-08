


import React, { useContext, useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'

import { Context } from '../../../Context_holder'




export default function Admin_sign_up() 
{
  const navigator= useNavigate()
  


const {setadmin,settoken,notify}=useContext(Context)
  

    const submit_signup_handler=(e)=>{

      e.preventDefault()

    
     const name= e.target.name.value
     const email= e.target.email.value
     const contact= e.target.Contact.value
     const password= e.target.password.value
     const confirm_password= e.target.Confirm_Password.value
         


      const data={
        name: name,
        email:email,
        contact:contact,
        password: password,
        confirm_password:confirm_password,
       approved:true
      }

     
      axios.post(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_ADMIN_URL}sign_up`, data,)
      .then((response) => {
       console.log(response);
       
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

    <div className="min-h-screen  py-10  bg-slate-300 ">
        
        <div className='flex justify-center mb-5'> 
          <Link to={"/"}><img src="/image/iSHOP Logo.svg" alt=""  className=''/></Link>
          
          </div>

      
    <div className="bg-white p-8 rounded-md shadow-md w-96 border mx-auto">
      
    <div className='flex justify-center'>
        <i class="fa-solid fa-user text-6xl mb-3" ></i>
        </div>
      <h2 className="text-xl font-semibold mb-6 text-center uppercase">Admin sign up</h2>


      <form onSubmit={submit_signup_handler}>



      <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            
          />
      </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            a
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          
          />
        </div>

        <div className="mb-4" >
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Contact
          </label>
          <input
            type="text"
            id="Contact"
            name="Contact"
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

        <div className="mb-6 " >
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
           Confirm Password
          </label>
          <input
            type="password"
            id="Confirm_Password"
            name="Confirm_Password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
           
          />
        </div>
     
        <div className="">
          <button
            type="submit"
            className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4
             rounded focus:outline-none focus:shadow-outline"
          > Sign In
           
          </button>

<Link to={"/admin_login"}>
<div>I have already an account <button className='text-[blue] mt-4 font-bold'> Login </button></div>
</Link>
          


        </div>

      </form>


    </div>
  </div>

  
  )
}
