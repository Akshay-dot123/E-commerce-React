import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import { ToastContainer, Bounce, toast } from "react-toastify";
import Chat from "./Chat";
const socket = io("http://localhost:3000");
function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (!username) {
      toast("Enter unique username");
      return;
    }
    if (!password) {
      toast("Enter valid password");
      return;
    }
    if (!room) {
      toast("Enter Room No. or Id");
      return;
    }
    if (username !== "" && room !== "" && password !== "") {
      socket.emit("join_room", {
        username: username,
        password: password,
        room: room
      });
      socket.on("join_success", () => {
        setShowChat(true);
        console.log(username)
        socket.emit("get_room_messages", { room, username }); 
      });
    }
  };
  useEffect(() => {
    // This is correct 
    // socket.on("join_success", () => {
    //   setShowChat(true);
    //   socket.emit("get_room_messages", room); 
    // });

    socket.on("join_error", (message) => {
      console.log(message)
      // toast.error(message);
      if (Array.isArray(message)) {
        // Display all messages from the array as toast errors
        message.forEach((msg) => toast.error(msg));
      } else {
        // If it's not an array, show a generic error
        toast.error(message);
      }
    });

    // calls twice
    return () => {
      socket.off("join_success");
      socket.off("join_error");
    };
  }, []);
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
        transition={Bounce}
      />
      <div className="App">
        {!showChat ? (
          <div className="joinChatContainer">
            <h1>Join a chat</h1>
            <input
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="Unique user Name"
            />
            <input
              type="text"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="password"
            />
            <input
              type="text"
              onChange={(e) => {
                setRoom(e.target.value);
              }}
              placeholder="Room No."
            />
            <button onClick={joinRoom}>Join Room</button>
          </div>
        ) : (
          <Chat sock={socket} name={username} room={room} />
        )}
      </div>
    </>
  );
}

export default App;
