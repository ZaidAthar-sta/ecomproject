import React, { useState, useEffect } from 'react';
import shopContext from './shopContext.js';
import axios from 'axios';
import { toast } from 'react-toastify';
import { jwtDecode } from "jwt-decode";

const ShopContextProvider = ({ children }) => {
     const backendURL = import.meta.env.VITE_BACKEND_URL;
     const [token, setToken] = useState("");
     const [isAdmin, setIsAdmin] = useState(false);
     const [isAuthenticated, setIsAuthenticated] = useState(false);
     const [loading, setLoading] = useState(true);
     const [products, setProducts] = useState([]);
     const [userId, setUserId] = useState("");
     const [cartItems, setCartItems] = useState([]);


     const currency = "$";

     useEffect(() => {
          const savedToken = localStorage.getItem("token");
          const adminFlag = localStorage.getItem("isAdmin") === "true";

          if (savedToken) {
               setToken(savedToken);
               setIsAuthenticated(true);
               setIsAdmin(adminFlag);
               try {
                    const decoded = jwtDecode(savedToken);
                    setUserId(decoded.userId);

               } catch (err) {
                    console.error("Invalid token:", err.message);
                    setUserId("");
               }
          } else {
               setIsAuthenticated(false);
               setIsAdmin(false);
          }

          setLoading(false);
     }, []);

     const login = (token, isAdminUser = false) => {
          localStorage.setItem('token', token);
          localStorage.setItem('isAdmin', isAdminUser);
          setToken(token);
          setIsAuthenticated(true);
          setIsAdmin(isAdminUser);
     };

     const logout = () => {
          localStorage.removeItem('token');
          localStorage.removeItem('isAdmin');
          setToken("");
          setIsAuthenticated(false);
          setIsAdmin(false);
     };

     const getUserCartData = async (token) => {
          try {
               const response = await axios.get(`${backendURL}/api/cart/get`, { headers: { Authorization: `Bearer ${token}` } });
               if (response.data.success) {
                    setCartItems(response.data.cartItems);
               }
          } catch (error) {
               console.log(error);
               toast.error(error.message);
          }
     }

     useEffect(() => {
          console.log(cartItems);
     }, [cartItems]);

     const getProducts = async () => {
          try {
               const response = await axios.get(backendURL + "/api/product/list");
               if (response.data.success) {
                    setProducts(response.data.message);
               } else {
                    toast.error(response.data.message);
               }
          } catch (error) {
               toast.error(error.message);
          }
     }

     useEffect(() => {
          getProducts();
     }, []);

     useEffect(() => {
          if (token) {
               getUserCartData(token);
          }
     }, [token]);


     const updateCart = async (productId, quantity) => {
          try {
               const response = await axios.post(
                    backendURL + "/api/cart/update",
                    { productId, quantity },
                    { headers: { Authorization: `Bearer ${token}` } }
               );

               if (response.data.success) {
                    // Refresh the cart after update
                    getUserCartData(token);
                    toast.success("Cart updated successfully");
               } else {
                    toast.error(response.data.message);
               }
          } catch (error) {
               console.error("Update cart error:", error.response?.data || error.message);
               toast.error("Failed to update cart");
          }
     };

     const placeOrder = async (orderData) => {
          try {
               const response = await axios.post(
                    backendURL + "/api/order/place",
                    orderData,
                    { headers: { Authorization: `Bearer ${token}` } }
               );

               if (response.data.success) {
                    toast.success("Order placed successfully!");
                    // Optionally clear cart after order
                    getUserCartData(token); // Refresh cart
                    return response.data.order;
               } else {
                    toast.error(response.data.message);
                    return null;
               }
          } catch (error) {
               toast.error("Order failed: " + error.message);
               return null;
          }
     };



     const contextVal = {
          backendURL,
          currency,
          token,
          setToken,
          isAuthenticated,
          isAdmin,
          login,
          logout,
          loading,
          products,
          cartItems,
          updateCart,
          placeOrder

     };

     return (
          <shopContext.Provider value={contextVal}>
               {children}
          </shopContext.Provider>
     );
};

export default ShopContextProvider;
