// import ProjectForm from "../forms/ProjectForm";
// import TaskForm from "../forms/TaskForm";
// import ProjectTable from "../forms/ProjectTable";
// import TaskTable from "../forms/TaskTable";
// import { getDecodedToken } from "../utils/auth";
// import { Link } from "react-router-dom";

// const Profile = () => {
//   const decoded = getDecodedToken();
//   console.log("Role:", decoded);

//   return (
//     <div>
//       <h1>Profile Page</h1>

//       <div style={{ display: "flex", gap: "40px" }}>
//         <div
//           style={{
//             flex: 1,
//             display: "flex",
//             alignItems: "center",
//             flexDirection: "column",
//             gap: "30px",
//           }}
//         >
//           <ProjectForm />
//           {/* <Link to="/projects">
//           Projects */}
//           <ProjectTable />
//           {/* </Link> */}
//         </div>
//         <div
//           style={{
//             flex: 1,
//             display: "flex",
//             alignItems: "center",
//             flexDirection: "column",
//             gap: "30px",
//           }}
//         >
//           <TaskForm />
//           <TaskTable />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import { Link, Outlet, useLocation } from "react-router-dom";
import ProjectForm from "../forms/ProjectForm";
import TaskForm from "../forms/TaskForm";
import TaskTable from "../forms/TaskTable";
import { getDecodedToken } from "../utils/auth";
import ProjectTable from "../forms/ProjectTable";
import UserProfile from "./UserProfile";

const Profile = () => {
  const decoded = getDecodedToken();
  console.log("Role:", decoded);
  const location = useLocation();

  const isNestedRoute = location.pathname !== "/profile";

  if (isNestedRoute) {
    return <Outlet />; // only render nested component like <ProjectId />
  }
  return (
    <div>
          <UserProfile>
          <h1 style={{ marginLeft: "20%" }}>Profile Page</h1>
          <Link style={{ marginLeft: "20%" }} to="/dashboard"> Go to Dashboard</Link>
          </UserProfile>
      <div style={{ display: "flex", gap: "40px", marginTop: "40px" }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          <ProjectForm />
          <Link to="projects"> See all Projects</Link>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          <TaskForm />
          <Link to="tasks"> See all Tasks</Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
