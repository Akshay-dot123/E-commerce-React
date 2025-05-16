import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
const Chat = ({ sock, name, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setmessageList] = useState([]);
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: name,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      sock.emit("send_message", messageData);
      // setmessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    sock.off("room_messages").on("room_messages", (messages) => {
      setmessageList(messages); // set to state
    });
    sock.off("receive_message").on("receive_message", (data) => {
      console.log(data);
      setmessageList((list) => [...list, data]);
    });
    sock.off("message_edited").on("message_edited", (updatedMessage) => {
      console.log("updatedMessage=====>", updatedMessage);
      setmessageList((list) =>
        list.map((msg) => (msg.id === updatedMessage.id ? updatedMessage : msg))
      );
    });
  }, [sock]);
  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent, index) => {
            const isYou = name === messageContent.user.username;
            const isEdited =
              messageContent.updatedAt &&
              messageContent.updatedAt !== messageContent.createdAt;
            console.log("Author========>", messageContent.user.username);
            console.log("Author========>", messageContent.id);
            console.log("name======>", name);
            return (
              <div
                className="message"
                id={isYou ? "you" : "other"}
                // id={name === messageContent.user.username ? "you" : "other"}
              >
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    sock.emit("delete_message", { id: messageContent.id });
                    setmessageList((list) =>
                      list.filter((_, i) => i !== index)
                    // list.map((msg, i) =>
                    //   i === index ? { ...msg, message: "You deleted this message", isDeleted: true } : msg
                    // )
                    );
                  }}
                >
                  🗑️
                </span>
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                  {isEdited && (
                    <span style={{ fontSize: "0.75rem", color: "gray", marginRight:"10px" }}>Edited</span>
                  )}
                    <p id="time">
                      {new Date(messageContent.createdAt).toLocaleTimeString()}
                    </p>
                    <p id="author">{messageContent.user.username}</p>
                  </div>
                </div>
                {isYou && (
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      const newMessage = prompt(
                        "Edit your message:",
                        messageContent.message
                      );
                      if (newMessage) {
                        sock.emit("edit_message", {
                          id: messageContent.id,
                          message: newMessage,
                        });
                      }
                    }}
                  >
                    ✏️
                  </span>
                )}
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div
        className="chat-footer"
        aria-placeholder="Type your message..."
        onChange={(e) => {
          setCurrentMessage(e.target.value);
        }}
        onKeyPress={(e) => {
          e.key == "Enter" && sendMessage();
        }}
      >
        <input type="text" value={currentMessage} />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
};
export default Chat;

// import React, { useEffect, useState } from "react";
// import ScrollToBottom from "react-scroll-to-bottom";
// import { DeleteMessageModal } from "./Modal/DeleteMessage";

// const Chat = ({ sock, name, room }) => {
//   const [currentMessage, setCurrentMessage] = useState("");
//   const [messageList, setmessageList] = useState([]);
//   const [editingMessageId, setEditingMessageId] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [messageToDelete, setMessageToDelete] = useState(null);

//   const sendMessage = () => {
//     if (currentMessage.trim() === "") return;

//     if (editingMessageId) {
//       sock.emit("edit_message", {
//         id: editingMessageId,
//         message: currentMessage,
//       });
//       setEditingMessageId(null); // exit edit mode
//     } else {
//       const messageData = {
//         room,
//         author: name,
//         message: currentMessage,
//         time: new Date().toLocaleTimeString(),
//       };
//       sock.emit("send_message", messageData);
//     }

//     setCurrentMessage("");
//   };

//   useEffect(() => {
//     sock.off("room_messages").on("room_messages", (messages) => {
//       setmessageList(messages);
//     });

//     sock.off("receive_message").on("receive_message", (data) => {
//       setmessageList((list) => [...list, data]);
//     });

//     sock.off("message_edited").on("message_edited", (updatedMessage) => {
//       console.log(updatedMessage);
//       setmessageList((list) =>
//         list.map((msg) => (msg.id === updatedMessage.id ? updatedMessage : msg))
//       );
//     });

//     sock.off("message_deleted").on("message_deleted", (updatedMessage) => {
//       console.log("updatedMessage===>", updatedMessage);
//       setmessageList((list) =>
//         list.map((msg) => (msg.id === updatedMessage.id ? updatedMessage : msg))
//       );
//     });
//   }, [sock]);

//   return (
//     <div className="chat-window">
//       <div className="chat-header">
//         <p>Live Chat</p>
//       </div>
//       <div className="chat-body">
//         <ScrollToBottom className="message-container">
//           {messageList.map((messageContent, index) => {
//             const isYou = name === messageContent.user.username;
//             const isEdited =
//               messageContent.updatedAt &&
//               messageContent.updatedAt !== messageContent.createdAt;

//             return (
//               <div
//                 className="message"
//                 id={isYou ? "you" : "other"}
//                 key={messageContent.id}
//               >
//                 {!messageContent.isDeleted && (
//                   <>
//                     {isYou && (
//                       <>
//                         <span
//                           style={{ cursor: "pointer", marginRight: "5px" }}
//                           onClick={() => {
//                             setCurrentMessage(messageContent.message); // put message in input
//                             setEditingMessageId(messageContent.id); // set edit mode
//                           }}
//                         >
//                           ✏️
//                         </span>
//                         {/* <span
//                       style={{ cursor: "pointer" }}
//                       onClick={() => {
//                         sock.emit("delete_message", { id: messageContent.id });
//                         setmessageList((list) =>
//                           list.filter((_, i) => i !== index)
//                         );
//                       }}
//                     >
//                       🗑️
//                     </span> */}

//                         <span
//                           style={{ cursor: "pointer" }}
//                           onClick={() => {
//                             setMessageToDelete(messageContent); // Store the message object
//                             setShowDeleteModal(true); // Show modal
//                           }}
//                         >
//                           🗑️
//                         </span>
//                       </>
//                     )}
//                     <div>
//                       <div className="message-content">
//                         <p>{messageContent.message}</p>
//                       </div>
//                       <div className="message-meta">
//                         {isEdited && (
//                           <span
//                             style={{
//                               fontSize: "0.75rem",
//                               color: "gray",
//                               marginRight: "10px",
//                             }}
//                           >
//                             Edited
//                           </span>
//                         )}
//                         <p id="time">
//                           {new Date(
//                             messageContent.createdAt
//                           ).toLocaleTimeString()}
//                         </p>
//                         <p id="author">{messageContent.user.username}</p>
//                       </div>
//                     </div>
//                   </>
//                 )}
//               </div>
//             );
//           })}
//         </ScrollToBottom>
//       </div>

//       <div className="chat-footer">
//         <input
//           type="text"
//           placeholder={
//             editingMessageId ? "Edit your message..." : "Type your message..."
//           }
//           value={currentMessage}
//           onChange={(e) => setCurrentMessage(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") sendMessage();
//             if (e.key === "Escape") {
//               setEditingMessageId(null);
//               setCurrentMessage("");
//             }
//           }}
//         />
//         <button onClick={sendMessage}>{editingMessageId ? "✅" : "➤"}</button>
//         {/* {editingMessageId && (
//           <button
//             onClick={() => {
//               setEditingMessageId(null);
//               setCurrentMessage("");
//             }}
//           >
//             ❌
//           </button>
//         )} */}

//         {showDeleteModal && (
//           <DeleteMessageModal
//             onClose={() => {
//               setShowDeleteModal(false);
//               setMessageToDelete(null);
//             }}
//             onDeleteForMe={() => {
//               setmessageList((list) =>
//                 list.filter((msg) => msg.id !== messageToDelete.id)
//               );
//               setShowDeleteModal(false);
//             }}
//             onDeleteForEveryone={() => {
//               sock.emit("delete_message", { id: messageToDelete.id });
//               setShowDeleteModal(false);
//             }}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Chat;
