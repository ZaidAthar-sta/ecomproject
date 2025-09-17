import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.css';

const Sidebar = ({ isAdmin = false }) => {
     return (
          <div className="d-flex sidebar flex-column p-3 text-dark bg-light" style={{ width: '200px' }}>
               <h4 className="text-center mb-4">Dashboard</h4>
               <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                         <Link to="/admin" className="nav-link">
                              <i className="bi bi-house-door me-2"></i> Home
                         </Link>
                    </li>
                    {!isAdmin && (
                         <>
                              <li>
                                   <Link to="/product/add" className="nav-link">
                                        <i className="bi bi-bag-check me-2"></i> Add Product
                                   </Link>
                              </li>
                              <li>
                                   <Link to="/order/all" className="nav-link">
                                        <i className="bi bi-bag-check me-2"></i> All Orders
                                   </Link>
                              </li>
                         </>
                    )}
                    {isAdmin && (
                         <>
                              <li>
                                   <Link to="/admin" className="nav-link">
                                        <i className="bi bi-speedometer2 me-2"></i> Admin Dashboard
                                   </Link>
                              </li>
                              <li>
                                   <Link to="/admin/users" className="nav-link">
                                        <i className="bi bi-people me-2"></i> Manage Users
                                   </Link>
                              </li>
                         </>
                    )}
               </ul>
          </div>
     );
};

export default Sidebar;
