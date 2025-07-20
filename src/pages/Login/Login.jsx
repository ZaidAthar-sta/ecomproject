import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useContext } from 'react';
import shopContext from '../../../context/shopContext';
import login_img from "../../assets copy/login_img.png";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const { backendURL, login, token, setToken } = useContext(shopContext);
     const navigate = useNavigate();

     const loginUser = async (e) => {
          e.preventDefault();

          const isAdminAttempt = email === import.meta.env.VITE_ADMIN_EMAIL;
          const endpoint = isAdminAttempt ? '/api/user/admin' : '/api/user/login';

          try {
               const result = await axios.post(`${backendURL}${endpoint}`, { email, password });

               if (result.data.success) {
                    const { token, isAdmin = false } = result.data;

                    // Call context login
                    login(token, isAdmin);

                    // Navigate based on user type
                    if (isAdmin) {
                         navigate('/admin');
                    } else {
                         navigate('/');
                    }
               } else {
                    console.log(result.data.message);
                    alert(result.data.message); // optional
               }
          } catch (error) {
               console.error("Login failed", error);
          }

     }




     return (
          <>
               <div className="main-container p-0 container mt-5 form-control d-flex">
                    <div className="login-img">
                         <img src={login_img} alt="" />
                    </div>
                    <div className="login-form d-flex flex-column justify-content-center align-items-center">
                         <h1><strong> Sign In Here</strong></h1>
                         <form onSubmit={loginUser} action="">
                              <div className="email-div my-3">
                                   <label className='m-2' htmlFor="email"><b>Email</b></label>
                                   <input placeholder='Enter Your Email' className=' form-control' type="text" id='email' onChange={(e) => setEmail(e.target.value)} />
                              </div>

                              <div className="password-div my-3">
                                   <label className='m-2' htmlFor="password"><b>Password</b></label>
                                   <input placeholder='Enter Password here' className=' form-control' type="text" id='password' onChange={(e) => setPassword(e.target.value)} />
                              </div>
                              <div className="btn-link">
                                   <button className='btn bg-success text-white' type="submit">Login</button>
                                   <div className='d-flex mt-4 justify-content-center' >
                                        <p className='mx-3 my-0'>Don't Have an Account?</p>
                                        <Link to={"/register"} >Create Account</Link>
                                   </div>

                              </div>
                         </form>
                    </div>
               </div>

          </>
     )
}

export default Login



// axios.post(backendURL + '/api/user/login', { email, password })
//      .then(result => {
//           console.log(result)
//           if (result.data.success) {
//                const { token, userId, isAdmin } = result.data;
//                login(token, isAdmin);
//                localStorage.setItem('token', token);
//                localStorage.setItem('userId', userId);
//                console.log(result.data.token);
//                navigate("/");
//           }
//      })
//      .catch(err => console.log(err))