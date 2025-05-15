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