import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { FIND_ALL_TASKS } from "../graphql/queries";
import { Link, Outlet, useParams } from "react-router-dom";
import { DELETE_TASK } from "../graphql/mutation";
import { toast } from "react-toastify";

const TaskTable = () => {
  const { id } = useParams();
  const { data, loading, error, refetch } = useQuery(FIND_ALL_TASKS);
  const [deleteTask] = useMutation(DELETE_TASK, {
    onCompleted: () => {
      refetch(); // Refresh the projects list after delete
    },
  });
  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Task?"
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
  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error fetching tasks: {error.message}</p>;
  if (id) {
    return <Outlet />;
  }
  return (
    <div>
      <h2>All Tasks</h2>
      <div style={{ display: "flex", justifyContent:"space-evenly"}}>
        <Link to="/profile/projects" style={{ margin: "0px 10px" }}>
          {" "}
          See all Projects
        </Link>
        <Link to="/profile"> Go to Profile Page</Link>
      </div>
      <div style={{ display: "flex",justifyContent:"center", overflowX:"auto"}}>
        <table border="1" cellPadding="10" cellSpacing="0" style={{ minWidth: "600px", width: "65%" }}>
          <thead>
            <tr>
              <th style={{width:"10px"}}>Task Id</th>
              <th style={{width:"100px"}}>Task Name</th>
              <th style={{width:"150px"}}>Description</th>
              <th style={{width:"10px"}}>Edit Tasks</th>
              <th style={{width:"10px"}}>Delete Tasks</th>
            </tr>
          </thead>
          <tbody>
            {data.findAllTask.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                {/* <td><Link to={`${task.id}`}>{task.id}</Link></td> */}
                <td style={{maxWidth:"200px",overflow:"auto", whiteSpace:"nowrap"}}>{task.task_name}</td>
                <td style={{maxWidth:"300px",overflow:"auto", whiteSpace:"nowrap"}}>{task.description}</td>
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
    </div>
  );
};

export default TaskTable;
