// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;


import { Navigate } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import React from "react";

const GET_ME = gql`
  query Me {
    me {
      id
      email
    }
  }
`;

const ProtectedRoute = ({ children }) => {
  const { data, loading, error } = useQuery(GET_ME);
  if (loading) return <p>Loading...</p>;
  if (error || !data?.me) return <Navigate to="/login" replace />;

  return children;
  // return React.cloneElement(children, { user: data.me });
};
export default ProtectedRoute;