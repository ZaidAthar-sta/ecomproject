import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/Protected/Protected";
import Navbar from "./components/Navbar/Navbar";
import AdminProtected from "./components/AdminProtected/AdminProtected";
import AdminDashboard from "./adminPages/AdminDashboard/AdminDashboard";
import EditProfile from "./pages/EditProfile/EditProfile";
import UserLayout from "./components/UserLayout/UserLayout";
import { useContext } from "react";
import shopContext from "../context/shopContext";
import AddProduct from "./adminPages/AddProduct/AddProduct";
import AllProducts from "./adminPages/AllProducts/AllProducts";
import Product from "./pages/Product/Product";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import AllOrders from "./pages/AllOrders/AllOrders";
import Collection from "./pages/Collections/Collection";
import About from "./pages/About/About";
import Footer from "./components/Footer/Footer";
import Contact from "./pages/Contact/Contact";

function AppContent() {
  const { isAuthenticated } = useContext(shopContext);
  const location = useLocation();

  const hideFooterOnRoutes = ["/login", "/register"];
  const shouldShowFooter =
    !hideFooterOnRoutes.includes(location.pathname) && isAuthenticated;

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route
          element={
            <ProtectedRoute>
              <Navbar />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<EditProfile />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/list" element={<AllProducts />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route
          element={
            <AdminProtected>
              <UserLayout />
            </AdminProtected>
          }
        >
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/product/add" element={<AddProduct />} />

          <Route path="/order/all" element={<AllOrders />} />
        </Route>
      </Routes>

      {/* Only show footer if not on login/register */}
      {shouldShowFooter && <Footer />}
    </>
  );
}

// ✅ Wrap AppContent with BrowserRouter here
function App() {
  const { loading } = useContext(shopContext);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
