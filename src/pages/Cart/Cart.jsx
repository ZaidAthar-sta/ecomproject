import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import shopContext from "../../../context/shopContext";
import "./Cart.css";

const Cart = () => {
  const { cartItems, currency, updateCart, placeOrder, token } =
    useContext(shopContext);
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 0) {
      updateCart(productId, newQuantity);
    }
  };

  const handlePlaceOrder = async () => {
    if (!shippingAddress) return alert("Please enter shipping address");
    if (!cartItems || cartItems.length === 0)
      return alert("Your cart is empty");

    const userId = JSON.parse(atob(token.split(".")[1])).userId;

    const orderData = {
      user: userId,
      shippingAddress,
      paymentMethod,
      date: Date.now(),
      products: cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        priceAtPurchase: item.product.price,
      })),
    };

    await placeOrder(orderData);
    setShippingAddress("");
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container cart-container empty-cart text-center">
        <h3>Your cart is empty</h3>
      </div>
    );
  }

  return (
    <div className="container cart-container mb-5">
     
      <h2 className="pt-5 text-dark">Your Cart</h2>

      <div className="row">
        {/* Cart Table (Left Side) */}
        <div className="col-lg-8 mb-4">
          <div className="table-responsive">
            <table className="table cart-table table-bordered text-center align-middle">
              <thead className="table-light">
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      <img
                        src={item.product?.image?.[0]}
                        alt={item.product?.title}
                        className="cart-img"
                      />
                    </td>
                    <td>{item.product?.title}</td>
                    <td>{item.product?.category}</td>
                    <td>
                      {currency}
                      {item.product?.price}
                    </td>
                    <td>
                      <div className="quantity-controls">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() =>
                            handleQuantityChange(
                              item.product._id,
                              item.quantity - 1
                            )
                          }
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() =>
                            handleQuantityChange(
                              item.product._id,
                              item.quantity + 1
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() =>
                          handleQuantityChange(item.product._id, 0)
                        }
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cart Total & Checkout Form (Right Side) */}
        <div className="col-lg-4">
          <div className="cart-summary p-4 border ">
            <h4 className="mb-3">CART SUMMARY</h4>

            <ul className="list-group mb-4 rounded-0">
              {cartItems.map((item, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>
                    {item.product?.title} × {item.quantity}
                  </span>
                  <span>
                    {currency}
                    {(item.product?.price * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between fw-bold">
                <span>Subtotal:</span>
                <span>
                  {currency}
                  {cartItems
                    .reduce(
                      (acc, item) => acc + item.product.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </span>
              </li>
            </ul>

            {/* Shipping Address */}
            <div className="mb-3">
              <h4 className="form-label">SHIPPING ADDRESS</h4>
              <textarea
                placeholder="Your shipping address"
                className="form-control"
                rows="3"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
              />
            </div>

            {/* Payment Method */}
            <div className="mb-3">
              <h4 className="form-label">PAYMENT METHOD</h4>
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

            {/* Place Order Button */}
            <button
              className="btn order-btn btn-dark w-100"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
