import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import "bootstrap/dist/css/bootstrap.min.css";


const UserLayout = () => {
     return (
          <div>

               <div className="">
                    <Navbar />
                    <div className="flex-grow-1 d-flex">
                         <Sidebar />
                         <div className="w-100">
                              <Outlet /> {/* This is where nested routes will render */}
                         </div>
                    </div>
               </div>

          </div>
     )
}

export default UserLayout
