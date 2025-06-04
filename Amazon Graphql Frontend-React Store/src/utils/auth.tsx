// export const getDecodedToken = () => {
//     const token = localStorage.getItem("token");
//     if (!token) return null;
  
//     try {
//       const payloadBase64 = token.split('.')[1];
//       return JSON.parse(atob(payloadBase64));
//     } catch (err) {
//       console.error("Failed to decode token:", err);
//       return null;
//     }
//   };


// utils/auth.ts
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

export const getDecodedToken = () => {
  try {
    const token = Cookies.get("token"); // This assumes your backend still sets a cookie
    console.log("token=========>",token)
    if (!token) return null;
    return jwtDecode(token);
  } catch (err) {
    console.error("Token decode error:", err);
    return null;
  }
};

  