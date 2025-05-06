import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FIND_USER_TASK_BY_ID } from '../graphql/queries';
import { UPDATE_MEMBER_TASK } from '../graphql/mutation';

const EditTaskUser = () => {
  const { id } = useParams();
  const UserTaskId = parseInt(id);
  const [userTask, setUserTask] = useState({});
  const [updateUserTask] = useMutation(UPDATE_MEMBER_TASK);

  const { data, loading, error } = useQuery(FIND_USER_TASK_BY_ID, {
    variables: { id: UserTaskId },
  });


  const handleUpdateUserTask = async (e) => {
    e.preventDefault();
    if (!userTask.task_status) {
      toast("Select Task Status");
      return;
    }
    if (!userTask.task_priority) {
      toast("Select Task Priority");
      return;
    }
    try {
      await updateUserTask({
        variables: {
          updateMemberTask: {
            id: UserTaskId,
            task_status: userTask.task_status,
            task_priority: userTask.task_priority,
          },
        },
        refetchQueries: [
          { query: FIND_USER_TASK_BY_ID, variables: { id: UserTaskId } },
        ],
      });
      toast.success("User Task updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error(err.message);
    }
  };

  if (loading) return <p>Loading project details...</p>;
  if (error) return <p>Error fetching project: {error.message}</p>;
  // if(data) return<p>{data}</p>

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
          padding: "20px 0px 30px",
          borderRadius: "8px",
          maxWidth: "500px",
          width: "100%",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Link to="/dashboard">Back To User Task</Link>
        <h2
          style={{ marginBottom: "7px", color: "#333", textAlign: "center" }}
        >
          Edit User Task
        </h2>
        <select
          onChange={(e) =>
            setUserTask((prev) => ({ ...prev, task_status: e.target.value }))
          }
          defaultValue=""
          style={{
            width: "80%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        >
          <option value="" disabled>
            Select Task Status
          </option>
          <option value="In_Progress">IN_PROGRESS</option>
          <option value="To_Do">TO_DO</option>
          <option value="Completed">COMPLETED</option>
        </select>
        <select
          onChange={(e) =>
            setUserTask((prev) => ({ ...prev, task_priority: e.target.value }))
          }
          defaultValue=""
          style={{
            width: "80%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        >
          <option value="" disabled>
            Select Task Priority
          </option>
          <option value="Low">LOW</option>
          <option value="Medium">MEDIUM</option>
          <option value="High">HIGH</option>
        </select>
        <button
          onClick={handleUpdateUserTask}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "10px 16px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            width: "80%",
          }}
        >
          Update User Task
        </button>
      </div>
    </div>
  );
}

export default EditTaskUser