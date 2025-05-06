import React from "react";
import { getDecodedToken } from "../utils/auth";

const UserProfile = ({children}) => {
  const decoded = getDecodedToken();
  console.log("Role:", decoded);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        backgroundColor: "#f9f9f9",
        padding: "10px 20px",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <span style={{ fontSize: "2rem" }}>👤</span>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>
          <strong>Email:</strong> {decoded.email}
        </span>
        <span>
          <strong>Role:</strong> {decoded.role}
        </span>
      </div>
      {children}
    </div>
  );
};

export default UserProfile;
