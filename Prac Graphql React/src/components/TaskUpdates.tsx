import { gql, useSubscription } from "@apollo/client";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getDecodedToken } from "../utils/auth";

const TASK_CREATED = gql`
  subscription TaskCreated($userId: Int!) {
    taskCreated(userId: $userId) {
      id
      task_name
      description
      taskUsers {
        id
      }
      # users {
      #   id
      #   email
      #   role
      # }
    }
  }
`;

export const TASK_UPDATED = gql`
  subscription TaskUpdated($userId: Int!) {
    taskUpdated(userId: $userId) {
      id
      task_status
      task_priority
      # users {
      #   id
      #   taskUsers {
      #     id
      #     task_priority
      #     task_status
      #   }
      # }
    }
  }
`;

// const TASK_CREATED = gql`
//   subscription TaskCreated($userId: Int!) {
//     taskCreated(userId: $userId) {
//       savedTask {
//         id
//         task_name
//         description
//       }
//       taskUsers {
//         id
//         task_status
//         task_priority
//         user {
//           id
//           email
//           role
//         }
//       }
//     }
//   }
// `;


const TaskUpdates = () => {
  const decoded = getDecodedToken();
  const userId = decoded?.id;

  const { data, loading } = useSubscription(TASK_CREATED, {
    variables: { userId },
    onSubscriptionData: ({ subscriptionData }) => {
      console.log("New Task received:", subscriptionData.data.taskCreated);
    },
  });
  console.log("loading==========>",loading)
  const { data: updateData, loading: updateLoad } = useSubscription(TASK_UPDATED, {
    variables: { userId },
    onSubscriptionData: ({ subscriptionData }) => {
      console.log("Task Updated:", subscriptionData.data.taskUpdated);
    },
  });
  console.log("updateLoad==========>",updateLoad)

  const task = data?.taskCreated;
  const updatedTask = updateData?.taskUpdated;

  useEffect(() => {
    if (task) {
      toast.success(`Task "${task.task_name}" created`);
    }
  }, [task]);

  useEffect(() => {
    if (updatedTask) {
      toast.info(`Task "${updatedTask.id}" updated`);
    }
  }, [updatedTask]);

  return (
    <div>
      {task && (
        <div style={{ border: "1px solid blue", padding: "10px", marginBottom: "10px" }}>
          <h3>Task Created</h3>
          <p><strong>ID:</strong> {task.id}</p>
          <p><strong>Name:</strong> {task.task_name}</p>
          <p><strong>Description:</strong> {task.description}</p>
        </div>
      )}

      {updatedTask && (
        <div style={{ border: "1px solid green", padding: "10px" }}>
          <h3>Task Updated</h3>
          <p>
            <strong>ID:</strong> {updatedTask.id}<br />
            <strong>Priority:</strong> {updatedTask.task_priority}<br />
            <strong>Status:</strong> {updatedTask.task_status}<br />
            <strong>Updated By:</strong> {userId}
          </p>
        </div>
      )}

      {!task && !updatedTask && <p>Waiting for task activity...</p>}
    </div>
  );
};

export default TaskUpdates;
