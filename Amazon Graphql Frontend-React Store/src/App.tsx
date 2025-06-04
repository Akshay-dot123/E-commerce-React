import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import CreateUser from "./components/CreateUser";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import ProtectedRoute from "./Authenticate-JWT/Protected-route";
import { getDecodedToken } from "./utils/auth";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProjectTable from "./forms/ProjectTable";
import ProjectId from "./components/ProjectId";
import TaskTable from "./forms/TaskTable";
import TaskId from "./components/TaskId";
import EdiTaskUser from "./pages/EditTaskUser";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Header from "./components/Header";
import Cart from "./components/Cart";
import { useEffect } from "react";

function App() {
  const decoded = getDecodedToken();
  const userRole = decoded;
  console.log("Role:", userRole);
  useEffect(() => {}, []);
  return (
    <BrowserRouter>
      <Provider store={appStore}>
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
          <Route
            // path="/dashboard"
            path="/products"
            element={
              <ProtectedRoute>
                <Header />
                <Dashboard />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<h1>Page Not Found</h1>}></Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
