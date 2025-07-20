import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import shopContext from '../../../context/shopContext';
import { useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const EditProfile = () => {

     const { backendURL, token } = useContext(shopContext);
     const [userDetails, setUserDetails] = useState("");
     const [name, setName] = useState("");
     const [photoUrl, setPhotoUrl] = useState("");

     const getUserProfile = async () => {
          try {
               const response = await axios.get(backendURL + "/api/user/profile", { headers: { token: token } });
               if (response.data.success) {
                    setUserDetails(response.data.findedUser);
               } else {
                    toast.error(response.data.message);
               }
          } catch (error) {
               console.log(error);
               toast.error(error.message);
          }
     }

     useEffect(() => {
          getUserProfile();
     }, [token]);


     const updateProfile = async (e) => {
          e.preventDefault();
          try {
               const formData = new FormData();
               formData.append("name", name);
               formData.append("photoUrl", photoUrl);

               const response = await axios.post(backendURL + "/api/user/update", formData, { headers: { token: token } });
               if (response.data.success) {
                    toast.success(response.data.message);
               } else {
                    toast.error(response.data.message);
               }
          } catch (error) {
               console.log(error);
               toast.error(error.message);
          }
     }

     if (!userDetails) {
          return <div className="text-center mt-5">Loading profile...</div>;
     }

     return (
          <>

               <div className="container mt-5">
                    <h2>Edit Profile</h2>

                    <div className="card p-4 mt-4">
                         <form onSubmit={updateProfile}>
                              <div className="mb-3">
                                   <label htmlFor="name" className="form-label">Name</label>
                                   <input
                                        id="name"
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                   />
                              </div>

                              <div className="mb-3">
                                   <label htmlFor="photoUrl" className="form-label">Upload Photo</label>
                                   <input
                                        id="photoUrl"
                                        type="file"
                                        className="form-control"
                                        accept="image/*"
                                        onChange={(e) => setPhotoUrl(e.target.files[0])}
                                   />
                              </div>

                              {userDetails.photoUrl && (
                                   <div className="mb-3">
                                        <p className='m-0' >Current Profile Photo:</p><br />
                                        <img
                                             src={userDetails.photoUrl}
                                             alt="Profile"
                                             style={{ height: '200px', borderRadius: '10px' }}
                                        />
                                   </div>
                              )}

                              <button type="submit" className="btn btn-primary">Update Profile</button>
                         </form>
                    </div>
               </div>    

          </>
     )
}

export default EditProfile
