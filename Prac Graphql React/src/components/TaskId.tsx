// import { useQuery } from "@apollo/client";
// import { FIND_TASK_BY_ID } from "../graphql/queries";
// import { useParams } from "react-router-dom";

// const TaskId = () => {
//   const { id } = useParams();
//   const { data, loading, error } = useQuery(FIND_TASK_BY_ID, {
//     variables: { id: parseInt(id) },
//   });

//   if (loading) return <p>Loading task...</p>;
//   if (error) return <p>Error loading task: {error.message}</p>;

//   const task = data.findTaskById;

//   return (
//     <div>
//       <h2>Task Details</h2>
//       <p><strong>ID:</strong> {task.id}</p>
//       <p><strong>Task Name:</strong> {task.task_name}</p>
//       <p><strong>Description:</strong> {task.description}</p>
//       {/* <h3>Assigned Users:</h3>
//       <ul>
//         {task.taskUsers.map(user => (
//           <li key={user.id}>{user.name} ({user.email})</li>
//         ))}
//       </ul> */}
//     </div>
//   );
// };

// export default TaskId;

import { useQuery, useMutation } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FIND_TASK_BY_ID } from "../graphql/queries";
import { UPDATE_TASK } from "../graphql/mutation";
import { toast } from "react-toastify";

const TaskId = () => {
  const { id } = useParams();
  const taskId = parseInt(id);
  const { data, loading, error } = useQuery(FIND_TASK_BY_ID, {
    variables: { id: taskId },
  });

  const [updateTask, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_TASK);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");
  // Populate form when data loads
  useEffect(() => {
    if (data?.findTaskById) {
      setTaskName(data.findTaskById.task_name);
      setDescription(data.findTaskById.description);
      setUserId(data.findTaskById.userId);
    }
  }, [data]);

  if (loading) return <p>Loading task...</p>;
  if (error) return <p>Error loading task: {error.message}</p>;

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (taskName.trim().length < 3) {
      toast.error("Task name must be at least 3 characters long");
      return;
    }
    try {
      await updateTask({
        variables: {
          updateTask: {
            id: taskId,
            task_name: taskName,
            description: description,
            userId: userId,
          },
        },
        refetchQueries: [{ query: FIND_TASK_BY_ID, variables: { id: taskId } }],
      });
      toast.success("Task updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      // toast.error(err.message);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#e0e0e0",
      }}
    >
      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px 30px",
          borderRadius: "8px",
          maxWidth: "500px",
          width: "100%",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Link to="/profile/tasks">Back To Tasks</Link>
        <h2 style={{ marginBottom: "7px", color: "#333", textAlign: "center" }}>
          Edit Task{" "}
        </h2>
        <form onSubmit={handleUpdate}>
          <div style={{ marginBottom: "10px" }}>
            <label
              style={{ display: "block", marginBottom: "5px", color: "#555" }}
            >
              Task Name
            </label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
              style={{
                width: "95%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label
              style={{ display: "block", marginBottom: "5px", color: "#555" }}
            >
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: "95%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{ display: "block", marginBottom: "5px", color: "#555" }}
            >
              Assign Task to User ID or User ID's separated by commas
            </label>
            <input
              required
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              style={{
                width: "95%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          {updateError && (
            <p style={{ marginTop: "10px", color: "red" }}>
              Error: {updateError.message}
            </p>
          )}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              type="submit"
              disabled={updateLoading}
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                padding: "10px 20px",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              {updateLoading ? "Updating..." : "Update Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskId;
