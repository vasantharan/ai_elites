import React from "react";
import "../Stylesheet/ChatResponse.css";

function ChatResponse({ message, isUser }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        padding: "10px",
        marginBottom: "10px",
        maxWidth: "80%",
        alignSelf: isUser ? "flex-end" : "flex-start",
      }}
    >
      <div
        style={{
          padding: "15px",
          borderRadius: "20px",
          color: isUser ? "white" : "black",
          fontWeight: "bold",
          maxWidth: "100%",
          backgroundColor: isUser ? "#007BFF" : "#D9D9D9",
          textAlign: "left",
          height: "auto",
          wordBreak: "break-word",
          overflowWrap: "break-word",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {message}
      </div>
    </div>
  );
}

export default ChatResponse;
