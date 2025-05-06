import { gql, useSubscription } from "@apollo/client";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getDecodedToken } from "../utils/auth";

const PROJECT_CREATED = gql`
  subscription ProjectCreated($userId: Int!) {
    projectCreated(userId: $userId) {
      id
      project_name
      description
      users {
        id
        email
        role
      }
    }
  }
`;

const ProjectUpdates = () => {
  const decoded = getDecodedToken();
  const userId = decoded?.id;
  const { data, loading } = useSubscription(PROJECT_CREATED, {
    variables: { userId },
  });
  const project = data?.projectCreated;
  console.log("project====>", project);

  useEffect(() => {
    if (project) {
      toast.success(`Project "${project.project_name}" created`);
    }
  }, [project]);

  if (loading && !data) return <p>Waiting for new projects...</p>;
  console.log("data============>", data);
  if (!data) return <p>null</p>;

  return (
    <div
      style={{ border: "1px solid green", padding: "1rem", marginTop: "1rem" }}
    >
      <h3>New Project Created</h3>
      <p>
        <strong>Name:</strong> {project.project_name}
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

export default ProjectUpdates;
