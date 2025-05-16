import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({ sock, name, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setmessageList] = useState([]);
  const [editingMessageId, setEditingMessageId] = useState(null);

  const sendMessage = () => {
    if (currentMessage.trim() === "") return;

    if (editingMessageId) {
      sock.emit("edit_message", {
        id: editingMessageId,
        message: currentMessage,
      });
      setEditingMessageId(null); // exit edit mode
    } else {
      const messageData = {
        room,
        author: name,
        message: currentMessage,
        time: new Date().toLocaleTimeString(),
      };
      sock.emit("send_message", messageData);
    }

    setCurrentMessage("");
  };

  useEffect(() => {
    sock.off("room_messages").on("room_messages", (messages) => {
      setmessageList(messages);
    });

    sock.off("receive_message").on("receive_message", (data) => {
      setmessageList((list) => [...list, data]);
    });

    sock.off("message_edited").on("message_edited", (updatedMessage) => {
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

            return (
              <div className="message" id={isYou ? "you" : "other"} key={messageContent.id}>
                {isYou && (
                  <>
                    <span
                      style={{ cursor: "pointer", marginRight: "5px" }}
                      onClick={() => {
                        setCurrentMessage(messageContent.message); // put message in input
                        setEditingMessageId(messageContent.id); // set edit mode
                      }}
                    >
                      ✏️
                    </span>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        sock.emit("delete_message", { id: messageContent.id });
                        setmessageList((list) =>
                          list.filter((_, i) => i !== index)
                        );
                      }}
                    >
                      🗑️
                    </span>
                  </>
                )}
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    {isEdited && (
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "gray",
                          marginRight: "10px",
                        }}
                      >
                        Edited
                      </span>
                    )}
                    <p id="time">
                      {new Date(messageContent.createdAt).toLocaleTimeString()}
                    </p>
                    <p id="author">{messageContent.user.username}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>

      <div className="chat-footer">
        <input
          type="text"
          placeholder={
            editingMessageId ? "Edit your message..." : "Type your message..."
          }
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
            if (e.key === "Escape") {
              setEditingMessageId(null);
              setCurrentMessage("");
            }
          }}
        />
        <button onClick={sendMessage}>
          {editingMessageId ? "✅" : "➤"}
        </button>
        {/* {editingMessageId && (
          <button
            onClick={() => {
              setEditingMessageId(null);
              setCurrentMessage("");
            }}
          >
            ❌
          </button>
        )} */}
      </div>
    </div>
  );
};

export default Chat;
