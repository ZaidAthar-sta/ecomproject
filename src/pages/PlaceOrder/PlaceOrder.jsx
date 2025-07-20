import React, { useContext } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "./PlaceOrder.css";
import shopContext from '../../../context/shopContext';

const PlaceOrder = () => {

     const { backendURL, token, userId } = useContext(shopContext);

     const productsInCart = [
          {
               product: "PRODUCT_ID_1",
               quantity: 2,
               priceAtPurchase: 25.99
          },
          {
               product: "PRODUCT_ID_2",
               quantity: 1,
               priceAtPurchase: 15.5
          }
     ];


     const totalAmount = productsInCart.reduce((total, item) => {
          return total + item.quantity * item.priceAtPurchase;
     }, 0);



     const [shippingAddress, setShippingAddress] = useState("");
     const [paymentMethod, setPaymentMethod] = useState("Cash");

     const handlePlaceOrder = async () => {
          try {
               if (!shippingAddress) {
                    toast.warning("Please enter a shipping address");
                    return;
               }

               const response = await axios.post(
                    `${backendURL}/api/order/place`,
                    {
                         user: "USER_ID_HERE", 
                         products: productsInCart,
                         totalAmount,
                         shippingAddress,
                         paymentMethod,
                         date: Date.now()
                    },
                    {
                         headers: {
                              Authorization: `Bearer ${token}`,
                              "Content-Type": "application/json"
                         }
                    }
               );

               if (response.data.success) {
                    toast.success("Order placed successfully!");
                    // Clear cart or redirect if needed
               } else {
                    toast.error(response.data.message);
               }

          } catch (error) {
               toast.error("Failed to place order: " + error.message);
          }
     };



     return (
          <div>

          </div>
     )
}

export default PlaceOrder
