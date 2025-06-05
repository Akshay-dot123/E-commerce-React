import { useLazyQuery, useMutation } from "@apollo/client";
import { CREATE_PROFILE } from "../graphql/mutation";
import { toast } from "react-toastify";
import { useState } from "react";

const Profile = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  // const [getProfile, { data: existingData, loading: loadingProfile }] = useLazyQuery(GET_PROFILE);
  const [fileProfileCreation, { data, loading, error }] =
    useMutation(CREATE_PROFILE);
  const handleSave = async () => {
    if (name.length < 3) {
      toast("Name must be at least 3 characters long");
      return;
    }
    if (address.length < 10) {
      toast("Address must be at least 10 characters long");
      return;
    }
    if (pincode.length < 5) {
      toast("Pincode must be at least 5 characters long");
      return;
    }
    const res = await fileProfileCreation({
      variables: {
        // ❗ This name MUST match the variable name in GraphQL mutation definition which is written with symbol $
        userInputForProfile: {
          name,
          address,
          pincode,
        },
      },
    });
    console.log("res=========>", res);
    toast("Cart created Successfully");
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-5">
        <h2 className="text-2xl font-semibold text-gray-800">Create Profile</h2>

        <input
          type="text"
          value={name}
          placeholder="Enter your Name"
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          value={address}
          placeholder="Enter your Address"
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          type="text"
          value={pincode}
          placeholder="Enter your Pincode"
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setPincode(e.target.value)}
        />

        <button
          onClick={handleSave}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 rounded-md transition duration-300"
        >
          {loading ? "Saving..." : "Save"}
        </button>

        {error && (
          <p className="text-sm text-red-500 mt-2">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </div>
  );
};
export default Profile;

// Updated code not interested to test see after sometimes
// import { useMutation } from "@apollo/client";
// import { CREATE_PROFILE, UPDATE_PROFILE } from "../graphql/mutation";
// import { toast } from "react-toastify";
// import { useEffect, useState } from "react";

// const Profile = ({ profile }) => {
//   const [name, setName] = useState("");
//   const [address, setAddress] = useState("");
//   const [pincode, setPincode] = useState("");

//   const [createProfile] = useMutation(CREATE_PROFILE);
//   // const [updateProfile] = useMutation(UPDATE_PROFILE);

//   useEffect(() => {
//     if (profile) {
//       setName(profile.name || "");
//       setAddress(profile.address || "");
//       setPincode(profile.pincode || "");
//     }
//   }, [profile]);

//   const handleSave = async () => {
//     if (name.length < 3) {
//       toast("Name must be at least 3 characters long");
//       return;
//     }
//     if (address.length < 10) {
//       toast("Address must be at least 10 characters long");
//       return;
//     }
//     if (pincode.length < 5) {
//       toast("Pincode must be at least 5 characters long");
//       return;
//     }

//     try {
//       if (profile && profile.id) {
//         // Editing existing profile
//         // const res = await updateProfile({
//         //   variables: {
//         //     id: profile.id,
//         //     userInputForProfile: {
//         //       name,
//         //       address,
//         //       pincode,
//         //     },
//         //   },
//         // });
//         toast("Profile updated successfully");
//         console.log("Update Response:", res);
//       } else {
//         // Creating new profile
//         const res = await createProfile({
//           variables: {
//             userInputForProfile: {
//               name,
//               address,
//               pincode,
//             },
//           },
//         });
//         toast("Profile created successfully");
//         console.log("Create Response:", res);
//       }
//     } catch (err) {
//       console.error("Mutation error:", err);
//       toast.error("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div className="flex flex-col gap-3">
//       <input
//         type="text"
//         value={name}
//         placeholder="Enter your Name"
//         className="border-2 border-black rounded-lg px-3 py-1 w-64"
//         onChange={(e) => setName(e.target.value)}
//       />
//       <input
//         type="text"
//         value={address}
//         placeholder="Enter your Address"
//         className="border-2 border-black rounded-lg px-3 py-1 w-64"
//         onChange={(e) => setAddress(e.target.value)}
//       />
//       <input
//         type="text"
//         value={pincode}
//         placeholder="Enter your Pincode"
//         className="border-2 border-black rounded-lg px-3 py-1 w-64"
//         onChange={(e) => setPincode(e.target.value)}
//       />
//       <button
//         onClick={handleSave}
//         className="bg-blue-600 text-white rounded-md px-4 py-2 mt-2"
//       >
//         {profile ? "Update" : "Create"} Profile
//       </button>
//     </div>
//   );
// };

// export default Profile;
