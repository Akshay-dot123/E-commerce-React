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

function App() {
  const decoded = getDecodedToken();
  const userRole = decoded?.role;
  console.log("Role:", userRole);

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
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="update/:id" element={<EdiTaskUser />}></Route>
        </Route>
        {userRole !== "MEMBER" ? (
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          >
            <Route path="projects" element={<ProjectTable />}>
              <Route path="update/:id" element={<ProjectId />}></Route>
            </Route>
            <Route path="tasks" element={<TaskTable />}>
              <Route path="update/:id" element={<TaskId />}></Route>
            </Route>
          </Route>
        ) : (
          <Route
            path="/profile"
            element={
              <div>
                Access Denied: Members are not allowed to view this page.
              </div>
            }
          />
        )}
        <Route path="*" element={<h1>Page Not Found</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
