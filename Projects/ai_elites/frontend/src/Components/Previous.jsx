import React, { useState, useEffect } from "react";
import "../Stylesheet/Previous.css";
import Logo from "../assets/chatbot_logo.png";
import { FaPlus } from "react-icons/fa6";
import { fetchChatHistory, chatRetrive } from "../api"; // Import the API function
import { handleNewChat } from "../api";

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

function Previous({ onNewChat, onChatClick, isblack }) {
  const [chatHistory, setChatHistory] = useState([]);

  const fetchAndSetChatHistory = async () => {
    try {
      const history = await fetchChatHistory();
      setChatHistory(history);
      console.log(history);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  useEffect(() => {
    fetchAndSetChatHistory();
    const intervalId = setInterval(fetchAndSetChatHistory, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const handleNewChatClick = async () => {
    try {
      const chatData = await handleNewChat();
      console.log("New chat started:", chatData);
      onNewChat();
    } catch (error) {
      console.error("Failed to start a new chat:", error);
    }
  };

  const handleChatClick = async (chatid) => {
    try {
      // console.log(chatid);
      const chatDetails = await chatRetrive({ chatid: chatid });
      console.log(chatDetails);
      onChatClick(chatDetails); // Pass chat details to parent component
    } catch (error) {
      console.error("Failed to fetch chat details:", error);
    }
  };

  return (
    <div className="previous">
      <div className="previous-header-logo">
        <div className="pre-logo">
          <div className="previous-logo">
            <img src={Logo} alt="logo" />
          </div>
          <div className="previous-title">CHAT JUSTICE</div>
        </div>
        <div className="icon" onClick={handleNewChatClick}>
          <FaPlus size={28} />
        </div>
      </div>
      <div className="previous-chat-history">
        {chatHistory.map((chat) => (
          <div
            key={chat._id}
            className="previous-chat-message"
            onClick={() => handleChatClick(chat.id)}
            style={{ color: isblack ? "white" : "black" }}
          >
            {truncateText(chat.title, 30)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Previous;
