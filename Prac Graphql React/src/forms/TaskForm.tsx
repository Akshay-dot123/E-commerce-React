import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TASK } from "../graphql/mutation";
import { FIND_ALL_TASKS } from "../graphql/queries";
import { toast } from "react-toastify";

const TaskForm = () => {
  const [newTask, setNewTask] = useState({});
  const [createTask, { data, loading, error }] = useMutation(CREATE_TASK, {
    refetchQueries: [{ query: FIND_ALL_TASKS }],
  });
  console.log(data)

  const handleCreateTask = async () => {
    if (!newTask.task_name || newTask.task_name.trim().length<3) {
      toast("Task Name must be greater then 3 characters");
      return;
    }
    if (!newTask.userId) {
      toast("Enter valid User Id or Id's");
      return;
    }
    if (!newTask.projectId) {
      toast("Enter valid Project Id");
      return;
    }
    try {
      await createTask({
        variables: {
          createTask: {
            task_name: newTask.task_name,
            userId: newTask.userId,
            description: newTask.description,
            projectId: parseFloat(newTask.projectId),
          },
        },
      });
      toast("Task created successfully!");
    } catch (err) {
      console.error("Error creating task:", err.message);
    }
  };
  return (
    <>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px 30px",
          borderRadius: "8px",
          maxWidth: "400px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Create a Task</h2>

        <input
          type="text"
          placeholder="Enter Task Name"
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, task_name: e.target.value }))
          }
          style={{
            width: "90%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="text"
          placeholder="Enter userId or userId's with comma"
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, userId: e.target.value }))
          }
          style={{
            width: "90%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="text"
          placeholder="Enter Description"
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, description: e.target.value }))
          }
          style={{
            width: "90%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="number"
          placeholder="Enter ProjectId"
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, projectId: e.target.value }))
          }
          style={{
            width: "90%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={handleCreateTask}
          style={{
            backgroundColor: "#28a745",
            color: "#fff",
            padding: "10px 16px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Create Task
        </button>

        {loading && (
          <p style={{ marginTop: "10px", color: "#555" }}>Creating task...</p>
        )}
        {error && (
          <p style={{ marginTop: "10px", color: "red" }}>
            Error: {error.message}
          </p>
        )}
      </div>
      {data && (
        <div>
          <table border="1" cellPadding="8" cellSpacing="0">
            <thead>
              <tr>
                <th colSpan="2">Recently Created Task</th>
              </tr>
              <tr>
                <th>Task ID</th>
                <th>Task Name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data.createTask.id}</td>
                <td>{data.createTask.task_name}</td>
              </tr>
              {/* {data.createTask.taskUsers.map((user)=>(
                <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default TaskForm;
