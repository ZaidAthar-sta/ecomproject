import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import shopContext from '../../../context/shopContext';
import { toast } from 'react-toastify';

const AllOrders = () => {
     const { backendURL, token, currency } = useContext(shopContext);
     const [orders, setOrders] = useState([]);

     const fetchOrders = async () => {
          try {
               const response = await axios.get(`${backendURL}/api/order/all`, {
                    headers: { Authorization: `Bearer ${token}` }
               });

               if (response.data.success) {
                    setOrders(response.data.orders);
               } else {
                    toast.error(response.data.message);
               }
          } catch (err) {
               toast.error("Failed to fetch orders");
               console.error(err);
          }
     };

     const handleStatusChange = async (orderId, newStatus) => {
          try {
               const response = await axios.post(
                    `${backendURL}/api/order/update-status/${orderId}`,
                    { status: newStatus },
                    { headers: { Authorization: `Bearer ${token}` } }
               );

               if (response.data.success) {
                    toast.success("Order status updated");
                    fetchOrders();
               } else {
                    toast.error(response.data.message);
               }
          } catch (error) {
               toast.error("Failed to update status");
               console.error(error);
          }
     };

     useEffect(() => {
          fetchOrders();
     }, []);

     return (
          <div className="container my-5">
               <h2 className="mb-4">All Orders</h2>
               {orders.length === 0 ? (
                    <div className="alert alert-info">No orders found.</div>
               ) : (
                    orders.map((order, index) => (
                         <div className="card mb-4" key={index}>
                              <div className="card-header d-flex justify-content-between">
                                   <span><strong>Order ID:</strong> {order._id}</span>
                                   <div className="d-flex align-items-center">
                                        <label className="me-2"><strong>Status:</strong></label>
                                        <select
                                             value={order.status}
                                             className="form-select form-select-sm w-auto"
                                             onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        >
                                             <option value="Pending">Pending</option>
                                             <option value="Delivered">Delivered</option>
                                             <option value="Cancelled">Cancelled</option>
                                        </select>
                                   </div>
                              </div>
                              <div className="card-body">
                                   <p><strong>User:</strong> {order.user}</p>
                                   <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
                                   <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                                   <p><strong>Total:</strong> {currency}{order.totalAmount}</p>
                                   <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
                                   <h6>Products:</h6>
                                   <ul className="list-group">
                                        {order.products.map((item, idx) => (
                                             <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                                                  <span>
                                                       <strong>Product:</strong> {item.product}<br />
                                                       <strong>Qty:</strong> {item.quantity}
                                                  </span>
                                                  <span><strong>Price:</strong> {currency}{item.priceAtPurchase}</span>
                                             </li>
                                        ))}
                                   </ul>
                              </div>
                         </div>
                    ))
               )}
          </div>
     );
};

export default AllOrders;
