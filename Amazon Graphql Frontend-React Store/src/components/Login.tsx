import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode";
import { getDecodedToken } from "../utils/auth";
import { toast } from "react-toastify";
const LOGIN_MUTATION = gql`
  mutation Login($loginInput: LoginUserInput!) {
    login(loginInput: $loginInput)
  }
`;
const Login = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION, {
    context: {
      credentials: "include",
    },
  });
  console.log(data)
  const handleLogin = async () => {
    if (!user.email) {
      toast("Enter valid Email");
      return;
    }
    if (!user.password) {
      toast("Enter valid password");
      return;
    }
    console.log("user");
    try {
      const response = await login({
        variables: {
          loginInput: {
            email: user.email,
            password: user.password,
          },
        },
      });
      if (response.data?.login) {
        const decoded = getDecodedToken();
        console.log("Role:", decoded);
        // const decoded = jwtDecode(response.data.login);
        toast("User LoggedIn successfully!");
        // if (decoded.role === "MEMBER") {
        //   navigate("/dashboard");
        // } else {
          navigate("/products");
        // }
        // localStorage.setItem("token", response.data.login);
        // Cookies.set("token", response.data.login, {
        //   expires: 1, // 1 day
        //   path: "/", // available on all routes
        //   secure: true, // set to true in production (HTTPS only)
        //   sameSite: "strict", // or 'lax' depending on your need
        // });
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };
  // return (
  //   <div>
  //     <input
  //       type="text"
  //       placeholder="Email..."
  //       onChange={(e) =>
  //         setUser((prev) => ({ ...prev, email: e.target.value }))
  //       }
  //     />
  //     <input
  //       type="text"
  //       placeholder="Password..."
  //       onChange={(e) =>
  //         setUser((prev) => ({ ...prev, password: e.target.value }))
  //       }
  //     />
  //     <button onClick={handleLogin}>Login</button>
  //     {error && <p>Error: {error.message}</p>}
  //     {data && <p>User Logged in</p>}
  //   </div>
  // );

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
          maxWidth: "400px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Login</h2>

        <input
          type="text"
          placeholder="Email..."
          onChange={(e) =>
            setUser((prev) => ({ ...prev, email: e.target.value }))
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
          placeholder="Password..."
          onChange={(e) =>
            setUser((prev) => ({ ...prev, password: e.target.value }))
          }
          style={{
            width: "90%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <Link to="/" style={{ color: "#007bff" }}>
          <button
            style={{
              backgroundColor: "#f1f1f1",
              color: "#007bff",
              padding: "10px 10px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Create User
          </button>
        </Link>

        <button
          onClick={handleLogin}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "10px 16px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Login
        </button>

        {error && (
          <p style={{ marginTop: "10px", color: "red" }}>
            Error: {error.message}
          </p>
        )}
        {data && (
          <p style={{ marginTop: "10px", color: "green" }}>User Logged in</p>
        )}
      </div>
    </div>
  );
};

export default Login;
