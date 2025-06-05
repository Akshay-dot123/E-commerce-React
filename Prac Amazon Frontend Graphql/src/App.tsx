import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import CreateUser from "./components/CreateUser";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./Authenticate-JWT/Protected-route";
import { getDecodedToken } from "./utils/auth";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import Header from "./components/Header";
import Cart from "./components/Cart";
import { useEffect } from "react";
import Pay from "./components/Pay";
import ProtectedLayout from "./Protected Route/ProtectedLayout";
import Profile from "./components/Profile";

function App() {
  const decoded = getDecodedToken();
  const userRole = decoded;
  console.log("Role:", userRole);
  useEffect(() => {}, []);
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
        transition={Bounce}
      />
      <Routes>
        <Route path="/" element={<CreateUser />} />
        <Route path="/login" element={<Login />} />
        {/* This is 1 way but we have to repeat ProtectedRoute comp for every route */}
        {/* <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Header />
              <Dashboard />
            </ProtectedRoute>
          }
        ></Route> */}
        <Route element={<ProtectedLayout />}>
          <Route path="/products" element={<Dashboard />} />
          <Route path="/account" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Pay />} />
        </Route>
        <Route path="*" element={<h1>Page Not Found</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
