// import React from "react";
// import { useQuery } from "@apollo/client";
// import { FIND_PROJECT_BY_ID } from "../graphql/queries"; // Import your query
// import { useParams } from "react-router-dom";

// const ProjectId = () => {
//   const { id } = useParams(); // Get the project ID from the URL
//   const { data, loading, error } = useQuery(FIND_PROJECT_BY_ID, {
//     variables: { id: parseInt(id) }, // Pass the ID as a variable to the query
//   });

//   if (loading) return <p>Loading project details...</p>;
//   if (error) return <p>Error fetching project: {error.message}</p>;

//   return (
//     <div>
//       <h2>Project Details</h2>
//       <p><strong>Project ID:</strong> {data.findProjectById.id}</p>
//       <p><strong>Project Name:</strong> {data.findProjectById.project_name}</p>
//       <p><strong>Description:</strong> {data.findProjectById.description}</p>
//       <p><strong>Completed Percentage:</strong> {data.findProjectById.completedPercentage}%</p>
//     </div>
//   );
// };

// export default ProjectId;

// ChatGpt code:-
import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { FIND_PROJECT_BY_ID } from "../graphql/queries";
import { UPDATE_PROJECT } from "../graphql/mutation";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ProjectId = () => {
  const { id } = useParams();
  const projectId = parseInt(id);

  const { data, loading, error } = useQuery(FIND_PROJECT_BY_ID, {
    variables: { id: projectId },
  });

  const [updateProject, { loading: updateLoading,  error: updateError }] =
    useMutation(UPDATE_PROJECT);

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (data?.findProjectById) {
      setProjectName(data.findProjectById.project_name);
      setDescription(data.findProjectById.description);
      setUserId(data.findProjectById.userId);
      console.log("Loaded project name:", data.findProjectById.project_name);
    }
  }, [data]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if(projectName.trim().length < 3){
      toast.error("Project name must be at least 3 characters long");
      return;
    }
    try {
      await updateProject({
        variables: {
          updateProjectInput: {
            id: projectId,
            project_name: projectName,
            description: description,
            userId: userId,
          },
        },
        refetchQueries: [
          { query: FIND_PROJECT_BY_ID, variables: { id: projectId } },
        ],
      });
      toast.success("Project updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      // toast.error(err.message);
    }
  };

  if (loading) return <p>Loading project details...</p>;
  if (error) return <p>Error fetching project: {error.message}</p>;

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
        <Link to="/profile/projects">Back To Project</Link>
        <h2
          style={{ marginBottom: "7px", color: "#333", textAlign: "center" }}
        >
          Edit Project
        </h2>
        <form onSubmit={handleUpdate}>
          <div style={{ marginBottom: "10px" }}>
            <label
              style={{ display: "block", marginBottom: "5px", color: "#555" }}
            >
              Project Name
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
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
              Assign Project to User ID or User ID's separated by commas
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
              {updateLoading ? "Updating..." : "Update Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectId;