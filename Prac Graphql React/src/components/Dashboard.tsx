import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { FIND_ALL_USER_TASKS } from "../graphql/queries";
import { Link, Outlet, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { DELETE_TASK_USER } from "../graphql/mutation";
import UserProfile from "./UserProfile";
import ProjectUpdates from "./ProjectUpdates";
import TaskUpdates from "./taskUpdates";

const Dashboard = () => {
  const { id } = useParams();
  const { data, loading, error, refetch } = useQuery(FIND_ALL_USER_TASKS);
  const [deleteTask] = useMutation(DELETE_TASK_USER, {
    onCompleted: () => {
      refetch(); // Refresh the projects list after delete
    },
  });
  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this User Task?"
    );
    if (confirmDelete) {
      try {
        await deleteTask({
          variables: { id: taskId },
        });
        toast.success("Task deleted successfully!");
        await refetch(); // Explicitly trigger the re-fetch of projects list
      } catch (err) {
        console.error("Delete failed:", err);
        toast.error("Not authorized to remove this Task");
      }
    }
  };
  const isNestedRoute = location.pathname !== "/dashboard";

  if (isNestedRoute) {
    return <Outlet />; // only render nested component like <ProjectId />
  }
  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>Error fetching projects: {error.message}</p>;
  return (
    <div>
      <ProjectUpdates/>
      <TaskUpdates/>
      <UserProfile>
        <h2 style={{ marginLeft: "15%" }}>Dashboard - All Users Tasks</h2>
        <Link style={{ marginLeft: "20%" }} to="/profile">
          {" "}
          Go to Profile
        </Link>
      </UserProfile>
      <div
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "center",
          overflowX: "auto",
        }}
      >
        <table
          border="1"
          cellPadding="10"
          cellSpacing="0"
          style={{ minWidth: "600px", width: "75%" }}
        >
          <thead>
            <tr>
              <th style={{ width: "10px" }}>User Task Id</th>
              <th style={{ width: "100px" }}>Project Name</th>
              <th style={{ width: "100px" }}>Task Name</th>
              <th style={{ width: "150px" }}>Task Description</th>
              <th style={{ width: "50px" }}>Task Status</th>
              <th style={{ width: "50px" }}>Task Priority</th>
              <th style={{ width: "10px" }}>Edit Tasks</th>
              <th style={{ width: "10px" }}>Delete Tasks</th>
            </tr>
          </thead>
          <tbody>
            {data.findAllUserTask.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td
                  style={{
                    maxWidth: "200px",
                    overflow: "auto",
                    whiteSpace: "nowrap",
                  }}
                >
                  {task.task.project.project_name}
                </td>
                <td
                  style={{
                    maxWidth: "200px",
                    overflow: "auto",
                    whiteSpace: "nowrap",
                  }}
                >
                  {task.task.task_name}
                </td>
                {/* <td style={{ maxWidth:"200px",overflow:"auto", whiteSpace:"nowrap"}}>{task.task.description}</td> */}
                <td>
                  <textarea
                    readOnly
                    style={{
                      border: "2px solid black",
                      minHeight: "50px",
                      minWidth: "200px",
                      maxHeight: "100px",
                      maxWidth: "250px",
                      resize: "both",
                      overflow: "auto",
                    }}
                  >
                    {task.task.description}
                  </textarea>
                </td>
                <td>{task.task_priority}</td>
                <td>{task.task_status}</td>
                <td>
                  <Link to={`update/${task.id}`}>{"✏️"}</Link>
                </td>
                <td>
                  <button onClick={() => handleDelete(task.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <Outlet/> */}
    </div>
  );
};

export default Dashboard;
