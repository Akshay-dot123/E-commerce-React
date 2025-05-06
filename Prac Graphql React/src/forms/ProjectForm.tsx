import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_PROJECT } from "../graphql/mutation";
import { FIND_ALL_PROJECTS } from "../graphql/queries";
import { toast } from "react-toastify";

const ProjectForm = () => {
  const [newProject, setNewProject] = useState({});
  const [createProject, { data, loading, error }] = useMutation(
    CREATE_PROJECT,
    {
      refetchQueries: [{ query: FIND_ALL_PROJECTS }],
    }
  );

  const handleCreateProject = async () => {
    if (!newProject.project_name || newProject.project_name.trim().length < 3) {
      toast("Project Name must be greater then 3 characters");
      return;
    }
    if (!newProject.userId) {
      toast("Enter valid User Id or Id's");
      return;
    }
    try {
      await createProject({
        variables: {
          createProject: {
            project_name: newProject.project_name,
            userId: newProject.userId,
            description: newProject.description,
          },
        },
      });
      toast("Project created Successfully");
    } catch (err) {
      console.log("Error creating project:", err);
    }
  };

  return (
    <>
      {
        // <div style={{ border:"2px solid black", padding:"10px 50px"}}>
        //   <h2>Create a Project</h2>
        //   <input
        //     type="text"
        //     placeholder="Enter Project Name"
        //     onChange={(e) => setNewProject((prev) => ({ ...prev, project_name: e.target.value }))}
        //   /><br/>
        //   <input
        //     type="text"
        //     placeholder="Enter userId"
        //     onChange={(e) => setNewProject((prev) => ({ ...prev, userId: e.target.value }))}
        //   /><br/>
        //   <button onClick={handleCreateProject}>Create Project</button>
        //   {loading && <p>Creating project...</p>}
        //   {error && <p>Error: {error.message}</p>}
        // </div>
      }
      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px 30px",
          borderRadius: "8px",
          maxWidth: "400px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#333" }}>
          Create a Project
        </h2>

        <input
          type="text"
          placeholder="Enter Project Name"
          onChange={(e) =>
            setNewProject((prev) => ({
              ...prev,
              project_name: e.target.value,
            }))
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
            setNewProject((prev) => ({
              ...prev,
              userId: e.target.value,
            }))
          }
          style={{
            width: "90%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="text"
          placeholder="Enter Description"
          onChange={(e) =>
            setNewProject((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          style={{
            width: "90%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={handleCreateProject}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "10px 16px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Create Project
        </button>

        {loading && (
          <p style={{ marginTop: "10px", color: "#555" }}>
            Creating project...
          </p>
        )}
        {error && (
          <p style={{ marginTop: "10px", color: "red" }}>
            Error: {error.message}
          </p>
        )}
      </div>

      {/* Project Result Section */}
      {data && (
        <div style={{ marginTop: "30px" }}>
          <table border="1" cellPadding="8" cellSpacing="0">
            <thead>
              <tr>
                <th colSpan="3">Recently Created Project</th>
              </tr>
              <tr>
                <th colSpan="3">
                  ProjectId: {data.createProject.id} | Name:{" "}
                  {data.createProject.project_name}
                </th>
              </tr>
              <tr>
                <th>UserId</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {data.createProject.users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
              <td
                colSpan="3"
                style={{ textAlign: "center", fontWeight: "bold" }}
              >
                Description:
              </td>
              <tr>
                <td colSpan="3">{data.createProject.description}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ProjectForm;
