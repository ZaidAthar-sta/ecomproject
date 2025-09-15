import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import shopContext from '../../../context/shopContext';
import { toast } from 'react-toastify';
import './AllOrders.css';

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

  const getStatusBadge = (status) => {
    const colorMap = {
      Pending: 'bg-warning text-dark',
      Delivered: 'bg-success',
      Cancelled: 'bg-danger'
    };
    return <span className={`badge rounded-pill ${colorMap[status]}`}>{status}</span>;
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-5 text-primary">🧾 All Orders</h2>
      {orders.length === 0 ? (
        <div className="alert alert-info text-center">No orders found.</div>
      ) : (
        orders.map((order, index) => (
          <div className="card order-card mb-4 shadow-sm" key={index}>
            <div className="card-header d-flex justify-content-between align-items-center">
              <div><strong>Order ID:</strong> <code>{order._id}</code></div>
              <div className="d-flex align-items-center gap-2">
                <label className="fw-semibold">Status:</label>
                {getStatusBadge(order.status)}
                <select
                  value={order.status}
                  className="form-select form-select-sm status-dropdown"
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <div className="card-body">
              <p><strong>👤 User:</strong> {order.user?.name}</p>
              <p><strong>📍 Shipping:</strong> {order.shippingAddress}</p>
              <p><strong>💳 Payment:</strong> {order.paymentMethod}</p>
              <p><strong>💰 Total:</strong> {currency}{order.totalAmount}</p>
              <p><strong>📅 Date:</strong> {new Date(order.date).toLocaleString()}</p>
              <h6 className="mt-4 mb-2 text-decoration-underline">🛒 Products</h6>
              <ul className="list-group product-list">
                {order.products.map((item, idx) => (
                  <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{item.product?.title}</strong><br />
                      Qty: {item.quantity}
                    </div>
                    <div className="text-end fw-bold">
                      {currency}{item.priceAtPurchase}
                    </div>
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
