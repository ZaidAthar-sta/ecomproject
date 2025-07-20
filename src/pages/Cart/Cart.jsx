import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useContext, useEffect } from 'react';
import shopContext from '../../../context/shopContext.js';

const Cart = () => {

     const { cartItems, currency, updateCart, placeOrder, token } = useContext(shopContext);

     const [shippingAddress, setShippingAddress] = useState('');
     const [paymentMethod, setPaymentMethod] = useState('Cash');

     if (!cartItems || cartItems.length === 0) {
          return <div className="container my-5 text-center">
               <h3>Your cart is empty</h3>
          </div>
     }

     const handleQuantityChange = (productId, newQuantity) => {
          if (newQuantity >= 0) {
               updateCart(productId, newQuantity);
          }
     };

     const handlePlaceOrder = async () => {
          if (!shippingAddress) return alert("Please enter shipping address");
          if (!cartItems || cartItems.length === 0) return alert("Your cart is empty");

          const userId = JSON.parse(atob(token.split('.')[1])).userId;

          const orderData = {
               user: userId,
               shippingAddress,
               paymentMethod,
               date: Date.now(),
               products: cartItems.map(item => ({
                    product: item.product._id,
                    quantity: item.quantity,
                    priceAtPurchase: item.product.price
               }))
          };

          await placeOrder(orderData);
          setShippingAddress("");
     };

     if (!cartItems || cartItems.length === 0) {
          return <div className="container my-5 text-center"><h3>Your cart is empty</h3></div>;
     }


     return (
          <>

               <div className="container my-5">
                    <h2 className="mb-4">Your Cart</h2>
                    <div className="row">
                         {cartItems.map((item, index) => (
                              <div className="col-md-6 mb-4" key={index}>
                                   <div className="card shadow-sm">
                                        <div className="row g-0">
                                             <div className="col-md-4">
                                                  <img
                                                       src={item.product?.image?.[0]}
                                                       className="img-fluid rounded-start"
                                                       alt={item.product?.title}
                                                  />
                                             </div>
                                             <div className="col-md-8">
                                                  <div className="card-body">
                                                       <h5 className="card-title">{item.product?.title}</h5>
                                                       <p className="card-text">Price: {currency}{item.product?.price}</p>
                                                       <p className="card-text text-muted">Category: {item.product?.category}</p>
                                                       <div className="d-flex align-items-center mb-2">
                                                            <button
                                                                 className="btn btn-sm btn-outline-secondary me-2"
                                                                 onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                                                                 disabled={item.quantity <= 1}
                                                            >-</button>
                                                            <span className="mx-2">{item.quantity}</span>
                                                            <button
                                                                 className="btn btn-sm btn-outline-secondary ms-2"
                                                                 onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                                                            >+</button>
                                                       </div>
                                                       <button
                                                            className="btn btn-sm btn-danger"
                                                            onClick={() => handleQuantityChange(item.product._id, 0)}
                                                       >
                                                            Remove
                                                       </button>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         ))}
                    </div>

                    {/* ORDER FORM */}
                    <div className="my-4">
                         <h4>Shipping Details</h4>
                         <div className="mb-3">
                              <label className="form-label">Shipping Address</label>
                              <textarea
                                   className="form-control"
                                   rows="3"
                                   value={shippingAddress}
                                   onChange={(e) => setShippingAddress(e.target.value)}
                              ></textarea>
                         </div>
                         <div className="mb-3">
                              <label className="form-label">Payment Method</label>
                              <select
                                   className="form-select"
                                   value={paymentMethod}
                                   onChange={(e) => setPaymentMethod(e.target.value)}
                              >
                                   <option value="Cash">Cash</option>
                                   <option value="Credit Card">Credit Card</option>
                                   <option value="Bank Transfer">Bank Transfer</option>
                                   <option value="Online">Online</option>
                              </select>
                         </div>
                         <button
                              className="btn btn-primary"
                              onClick={handlePlaceOrder}
                         >
                              Place Order
                         </button>
                    </div>
               </div>

               {/* <div className="container my-5">
                    <h2 className="mb-4">Your Cart</h2>
                    <div className="row">
                         {cartItems.map((item, index) => (
                              <div className="col-md-6 mb-4" key={index}>
                                   <div className="card shadow-sm">
                                        <div className="row g-0">
                                             <div className="col-md-4">
                                                  <img
                                                       src={item.product?.image?.[0]}
                                                       className="img-fluid rounded-start"
                                                       alt={item.product?.title}
                                                  />
                                             </div>
                                             <div className="col-md-8">
                                                  <div className="card-body">
                                                       <h5 className="card-title">{item.product?.title}</h5>
                                                       <p className="card-text">Price: {currency}{item.product?.price}</p>
                                                       <p className="card-text">Quantity: {item.quantity}</p>
                                                       <p className="card-text text-muted">Category: {item.product?.category}</p>
                                                       <div className="d-flex align-items-center mb-2">
                                                            <button
                                                                 className="btn btn-sm btn-outline-secondary me-2"
                                                                 onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                                                                 disabled={item.quantity <= 1}
                                                            >
                                                                 -
                                                            </button>
                                                            <span className="mx-2">{item.quantity}</span>
                                                            <button
                                                                 className="btn btn-sm btn-outline-secondary ms-2"
                                                                 onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                                                            >
                                                                 +
                                                            </button>
                                                       </div>
                                                       <button
                                                            className="btn btn-sm btn-danger"
                                                            onClick={() => handleQuantityChange(item.product._id, 0)}
                                                       >
                                                            Remove
                                                       </button>
                                                       <button>
                                                            Place Order
                                                       </button>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         ))}
                    </div>
               </div> */}



          </>
     )
}

export default Cart
