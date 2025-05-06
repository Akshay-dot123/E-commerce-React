// import React from "react";
// import { useQuery } from "@apollo/client";
// import { FIND_ALL_PROJECTS } from "../graphql/queries";

// const ProjectTable = () => {
//   const { data, loading, error } = useQuery(FIND_ALL_PROJECTS);

//   if (loading) return <p>Loading projects...</p>;
//   if (error) return <p>Error fetching projects: {error.message}</p>;

//   return (
//     <div>
//       <h2>All Projects</h2>
//       <table border="1" cellPadding="10" cellSpacing="0">
//         <thead>
//           <tr>
//             <th>Project Id</th>
//             <th>Project Name</th>
//             <th>Description</th>
//             {/* <th>Tasks</th>  */}
//           </tr>
//         </thead>
//         <tbody>
//           {data.findAllProject.map((project) => (
//             <tr key={project.id}>
//               <td>{project.id}</td>
//               <td>{project.project_name}</td>
//               <td>{project.description}</td>
//                 {/* <td>
//                   {project.tasks.length > 0 ? (
//                     <table border="1" cellPadding="5" cellSpacing="0">
//                       <thead>
//                         <tr>
//                           <th>Task Name</th>
//                           <th>Description</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {project.tasks.map((task) => (
//                           <tr key={task.id}>
//                             <td>{task.task_name}</td>
//                             <td>{task.description}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   ) : (
//                     <p>No tasks assigned</p>
//                   )}
//                 </td> */}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProjectTable;

import { useMutation, useQuery } from "@apollo/client";
import { FIND_ALL_PROJECTS } from "../graphql/queries";
import { DELETE_PROJECT } from "../graphql/mutation";
import { Link, Outlet, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ProjectUpdates from "../components/ProjectUpdates";

const ProjectTable = () => {
  const { id } = useParams();
  const { data, loading, error, refetch } = useQuery(FIND_ALL_PROJECTS);
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    onCompleted: () => {
      refetch(); // Refresh the projects list after delete
    },
  });
  const handleDelete = async (projectId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (confirmDelete) {
      try {
        await deleteProject({
          variables: { id: projectId },
        });
        toast.success("Project deleted successfully!");
        await refetch(); // Explicitly trigger the re-fetch of projects list
      } catch (err) {
        console.error("Delete failed:", err);
        toast.error("Not authorized to remove this project");
      }
    }
  };
  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>Error fetching projects: {error.message}</p>;
  if (id) {
    return <Outlet />;
  }
  return (
    <div>
      <ProjectUpdates/>
      <h2>All Projects</h2>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Link to="/profile/tasks"> See all Tasks</Link>
        <Link to="/profile"> Go to Profile Page</Link>
      </div>
      <div
        style={{ overflowX: "auto", display: "flex", justifyContent: "center" }}
      >
        <table
          border="1"
          cellPadding="10"
          cellSpacing="0"
          style={{ minWidth: "600px", width: "65%" }}
        >
          <thead>
            <tr>
              <th style={{ width: "10px" }}>Project Id</th>
              <th style={{ width: "100px" }}>Project Name</th>
              <th style={{ width: "200px" }}>Description</th>
              <th style={{ width: "10px" }}>Edit Project</th>
              <th style={{ width: "10px" }}>Delete Project</th>
              {/* <th>Tasks</th> */}
            </tr>
          </thead>
          <tbody>
            {data.findAllProject.map((project) => (
              <tr key={project.id}>
                <td
                  style={{
                    maxWidth: "120px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {project.id}
                  {/* <Link to={`${project.id}`}>{project.id}</Link> */}
                </td>
                <td
                  style={{
                    maxWidth: "200px",
                    overflow: "auto",
                    whiteSpace: "nowrap",
                  }}
                >
                  {project.project_name}
                </td>
                <td
                  style={{
                    maxWidth: "300px",
                    overflow: "auto",
                    whiteSpace: "nowrap",
                  }}
                >
                  {project.description}
                </td>
                <td
                  style={{
                    maxWidth: "300px",
                    overflow: "auto",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Link to={`update/${project.id}`}>{"✏️"}</Link>
                </td>
                <td
                  style={{
                    maxWidth: "300px",
                    overflow: "auto",
                    whiteSpace: "nowrap",
                  }}
                >
                  <button
                    onClick={() => handleDelete(project.id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                    aria-label={`Delete project ${project.project_name}`}
                  >
                    🗑️
                  </button>
                </td>
                {/* <td>
                  {project.tasks.length > 0 ? (
                    <div style={{ overflowX: "auto", maxWidth: "400px" }}>
                      <table border="1" cellPadding="5" cellSpacing="0">
                        <thead>
                          <tr>
                            <th style={{ width: "150px" }}>Task Name</th>
                            <th style={{ width: "250px" }}>Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {project.tasks.map((task) => (
                            <tr key={task.id}>
                              <td style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
                                {task.task_name}
                              </td>
                              <td style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
                                {task.description}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p>No tasks assigned</p>
                  )}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectTable;
