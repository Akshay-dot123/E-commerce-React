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
      # users {
      #   id
      #   email
      #   role
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
  });
  const project = data?.taskCreated;
  // const project = data?.taskCreated?.savedTask;
  console.log("Task====>", project);

  useEffect(() => {
    if (project) {
      toast.success(`Task "${project.task_name}" created`);
    }
  }, [project]);

  if (loading && !data) return <p>Waiting for new Tasks...</p>;
  console.log("data============>", data);
  if (!data) return <p>null</p>;

  return (
    <div
      style={{ border: "1px solid green", padding: "1rem", marginTop: "1rem" }}
    >
      <h3>New Project Created</h3>
      <p>
        <strong>Name:</strong> {project.task_name}
      </p>
      <p>
        <strong>Description:</strong> {project.description}
      </p>
      <p>
        <strong>Users:</strong>
      </p>
      <ul>
        {project.users.map((user: any) => (
          <li key={user.id}>
            {user.email} ({user.role})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskUpdates;
