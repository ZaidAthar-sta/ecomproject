import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css";
import { Link } from "react-router-dom";
import { useState, useContext } from 'react';
import shopContext from '../../../context/shopContext';
import { toast } from "react-toastify";
import axios from "axios";

const Signup = () => {
  const { backendURL, setToken } = useContext(shopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Backend URL:", backendURL);
    console.log("Form submitted");
    try {
      const response = await axios.post(backendURL + "/api/user/register", { name, email, password })
      if (response.data.success) {
        console.log(response.data);
        toast.success(response.data.message);
        // navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }

  return (
    <>
      <div className='container form-container my-5' >
        <h2>Sign Up Here</h2>

        <form onSubmit={handleSubmit} className='form ' action="">
          <div className="name">
            <label htmlFor="name">Name</label>
            <input placeholder='Enter Your Name' id='name' type="text" className='form-control' onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input id='email' placeholder='Enter Your Email' type="text" onChange={(e) => setEmail(e.target.value)} className='form-control' />
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input id='password' placeholder='Enter Password ' type="text" onChange={(e) => setPassword(e.target.value)} className='form-control' />
          </div>
          <button className='my-3' type="submit">Register</button>
          <p>Already have an account?<span> <Link to={"/login"} >Sign In</Link>  </span></p>
        </form>

      </div>
    </>

  )
}



export default Signup