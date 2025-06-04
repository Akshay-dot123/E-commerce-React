import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CREATE_USER = gql`
  mutation CreateUser($createUser: CreateUserInput!) {
    createUser(createUser: $createUser) {
      id
      email
    }
  }
`;

function CreateUser() {
  const [newUser, setNewUser] = useState({});
  const navigate = useNavigate();
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);
  const validRoles = ["Admin", "Team_lead", "Member"];
  console.log(data);
  const handleCreateUser = async () => {
    if (!newUser.email) {
      toast("Enter valid Email");
      return;
    }
    if (!newUser.password) {
      toast("Password should be at least 4 characters long.");
      return;
    }
    // if (!validRoles.includes(newUser.role)) {
    //   toast("Please select a valid role.");
    //   return;
    // }
    try {
      const response = await createUser({
        variables: {
          createUser: {
            email: newUser.email,
            password: newUser.password,
            // role: newUser.role,
          },
        },
      });

      if (response.data) {
        toast("User created successfully!");
        navigate("/login");
      }
    } catch (err) {
      console.error("Mutation error:", err);
      const graphQLError = err.graphQLErrors?.[0];

      if (
        graphQLError?.extensions?.originalError?.message &&
        Array.isArray(graphQLError.extensions.originalError.message)
      ) {
        const messages = graphQLError.extensions.originalError.message;
        messages.forEach((msg) => toast.error(msg));
      // } else {
        // toast.error(graphQLError?.message || "An unexpected error occurred.");
      }
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
          backgroundColor: "#f9f9f9",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2
          style={{ marginBottom: "20px", color: "#333", textAlign: "center" }}
        >
          Create User
        </h2>

        {/* Email Input */}
        <input
          type="text"
          placeholder="Email..."
          onChange={(e) =>
            setNewUser((prev) => ({ ...prev, email: e.target.value }))
          }
          style={{
            width: "90%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password..."
          onChange={(e) =>
            setNewUser((prev) => ({ ...prev, password: e.target.value }))
          }
          style={{
            width: "90%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        {/* Create User Button */}
        <button
          onClick={handleCreateUser}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "10px 16px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            width: "90%",
          }}
        >
          Create User
        </button>

        {/* Navigation to Login */}
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <span>Already a User? </span>
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "#007bff" }}
          >
            <button
              style={{
                backgroundColor: "#f1f1f1",
                color: "#007bff",
                border: "1px solid #007bff",
                padding: "10px 16px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </Link>
        </div>

        {/* Loading/Error/Success Messages */}
        {loading && (
          <p style={{ marginTop: "10px", color: "#007bff" }}>
            Creating user...
          </p>
        )}
        {error && (
          <p style={{ marginTop: "10px", color: "red" }}>
            {error.message.includes("ER_DUP_ENTRY")
              ? "Email already exists"
              : `Error: ${error.message}`}
          </p>
        )}
        {data && (
          <p style={{ marginTop: "10px", color: "green" }}>
            User created: {data.createUser.email}
          </p>
        )}
      </div>
    </div>
  );
}

export default CreateUser;
