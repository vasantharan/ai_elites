import React, { useState, useRef, useEffect } from "react";
import "../Stylesheet/Chat.css";
import Previous from "../Components/Previous";
import DropdownItem from "../Components/Dropdown";
import { IoMdSend } from "react-icons/io";
import TypingIndicator from "../Components/TypingIndicator";
import ProfileDropdown from "../Components/ProfileDropdown";
import VirtualCourts from "../Components/VirtualCourts";
import Box from "../Components/Box";
import LiveStream from "../Components/LiveStreaming";
import Logo from "../assets/chatbot_logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import Joyride from "react-joyride";
import MobilePrevious from "../Components/MobilePrevious";
import { chat } from "../api";
import { Toast } from "react-bootstrap";
import SendButton from "../Components/SendButton";
import ReactSwitch from "react-switch";
import Settings from "../Components/Settings";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [stepsEnabled, setStepsEnabled] = useState(true);
  const [showVirtualCourts, setShowVirtualCourts] = useState(false);
  const [showlivestream, setShowlivestream] = useState(false);
  const chatEndRef = useRef(null);
  const [profile, setProfile] = useState("");
  const [displayedBotMessage, setDisplayedBotMessage] = useState(""); // For typing effect
  const [botTyping, setBotTyping] = useState(false); // Track if the bot is typing
  const [isPreviousOpen, setIsPreviousOpen] = useState(true); // State for Previous component visibility
  const [firstlogin, setfirstlogin] = useState("");
  const [previousMobile, setpreviousMobile] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [setting, setsetting] = useState(false);
  const [themeblack, setthemeblack] = useState(false);

  const handleSend = async () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        { text: input, user: "user", profilePic: profile },
      ]);
      setInput("");
      setIsTyping(true);
      setBotTyping(true); // Bot starts typing when user sends a message

      try {
        const botresponse = await chat({ prompt: input });
        setIsLoading(true);
        handleTypingComplete(botresponse); // Ensure botresponse is a string
      } catch (err) {
        console.error("Error sending message to the backend:", err);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "Error occurred while processing your request.",
            user: "bot",
            profilePic: Logo,
          },
        ]);
        setIsTyping(false);
        setBotTyping(false);
      } finally {
        setIsLoading(false);
      }
    }
  };
  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  useEffect(() => {
    // Set the data-theme attribute on the html tag when the theme changes
    document.getElementById("chat-wrapper").setAttribute("data-theme", theme);
    setthemeblack(!themeblack);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const handleTypingComplete = (message) => {
    if (typeof message === "object" && message !== null) {
      // Assume the message object has a `text` property
      message = message.text || "";
    }

    if (typeof message !== "string") {
      console.error("Invalid message type:", message);
      return;
    }

    setIsTyping(false);
    setBotTyping(false);
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedBotMessage(message.substring(0, index));
      index++;
      if (index > message.length) {
        clearInterval(interval);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: message, user: "bot", profilePic: Logo },
        ]);
        setDisplayedBotMessage("");
        setBotTyping(false);
        setIsTyping(false);
      }
    }, 50);
  };

  useEffect(() => {
    const first_Login = getCookie("First Login");
    const data = getCookie("profile");

    setfirstlogin(first_Login);
    setProfile(data);
  }, []);
  useEffect(() => {
    if (firstlogin === "First Login") {
      console.log("First Login detected");
    }
  }, [firstlogin]); // Track changes to firstlogin

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, displayedBotMessage]);

  const steps = [
    {
      target: ".previous",
      disableBeacon: true,
      content: "Here you can see your previous chats.",
    },
    {
      target: ".quicklinks",
      disableBeacon: true,
      content:
        "Here you can see the judicial services and e-services such as virtual courts,telelaw servies,case status,Live streaming.",
    },
    {
      target: ".example-chat",
      disableBeacon: true,
      content: "Here you can see the example.",
    },
    {
      target: ".chat-messages",
      disableBeacon: true,
      content: "Here you can see the chat messages.",
    },
    {
      target: ".chat-input",
      disableBeacon: true,
      content: "Type your message here. Press Enter to send.",
    },
    {
      target: ".send-button",
      disableBeacon: true,
      content: "Click here to send your message.",
    },
  ];
  const handleChatSelect = (chatDetails) => {
    setMessages(chatDetails.messages); // Set retrieved messages
  };

  const handleBoxClick = async (text) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text, user: "user", profilePic: profile },
    ]);
    setIsTyping(true);
    setBotTyping(true); // Bot starts typing when a box is clicked

    try {
      const botresponse = await chat({ prompt: text });
      setIsLoading(true);
      handleTypingComplete(botresponse); // Ensure botresponse is a string
    } catch (err) {
      console.error("Error sending message to the backend:", err);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "Error occurred while processing your request.",
          user: "bot",
          profilePic: Logo,
        },
      ]);
      setIsTyping(false);
      setBotTyping(false);
    } finally {
      setIsLoading(false);
    }
  };
  const togglePrevious = () => {
    setIsPreviousOpen((prevState) => !prevState);
    setpreviousMobile((previous) => !previous);
  };
  const handleChatClick = (chatDetails) => {
    // Handle when a chat is clicked in the Previous component
    if (chatDetails && chatDetails.messages) {
      // Transform messages based on your data structure
      const transformedMessages = chatDetails.messages.map((msg) => ({
        text: msg.content,
        user: msg.role === "user" ? "user" : "bot",
        profilePic: msg.role === "user" ? profile : Logo,
      }));
      setMessages(transformedMessages); // Update the messages with the clicked chat's messages
    } else {
      console.error("No messages found for the selected chat");
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setInput("");
    setIsTyping(false);
    setBotTyping(false);
    setDisplayedBotMessage("");
  };

  return (
    <div id="chat-wrapper">
      <div className="whole-chat">
        {firstlogin === "First Login" && (
          <Joyride
            steps={steps}
            continuous={true}
            scrollToFirstStep={true}
            showProgress={true}
            showSkipButton={true}
            callback={(data) => {
              const { status } = data;
              if (status === "finished" || status === "skipped") {
                setStepsEnabled(false);
              }
            }}
            styles={{
              options: {
                zIndex: 10000,
              },
              buttonNext: {
                backgroundColor: "#007bff",
              },
              buttonBack: {
                marginRight: 10,
              },
            }}
          />
        )}

        <div className="hamburger-menu" onClick={togglePrevious}>
          <GiHamburgerMenu size={"20px"} color="white" />
        </div>
        {previousMobile ? <MobilePrevious /> : null}

        {isPreviousOpen && (
          <div className="previous">
            <Previous
              onNewChat={startNewChat}
              onChatClick={handleChatClick}
              isblack={themeblack}
            />{" "}
            {/* Pass the function here */}
            <div className="close-btn" onClick={togglePrevious}>
              <IoClose size={"20px"} />
            </div>
          </div>
        )}

        <div className="chat-container">
          <div className="chat-header">
            <div className="quicklinks">
              <DropdownItem
                onVirtualCourtClick={() => setShowVirtualCourts(true)}
                onshowlivestream={() => setShowlivestream(true)}
              />
            </div>
            <div className="whole-toggle">
              <div className="profile-dropdown">
                <ProfileDropdown
                  profileImageUrl={profile}
                  setSetting={() => setsetting(true)}
                />
              </div>
            </div>
          </div>
          <div className="chat-messages">
            {messages.length === 0 ? (
              <div className="example-chat">
                <Box
                  text="Who is the Chief justice of India"
                  onClick={() =>
                    handleBoxClick("Who is the Chief justice of India")
                  }
                />
                <Box
                  text="Steps for eFiling"
                  onClick={() => handleBoxClick("Steps for eFiling")}
                />
                <Box
                  text="Give me the vacancy of madras high court"
                  onClick={() =>
                    handleBoxClick("Give me the vacancy of madras high court")
                  }
                />
                <Box
                  text="Explain various divisions of DOJ India"
                  onClick={() =>
                    handleBoxClick("Explain various divisions of DOJ India")
                  }
                />
              </div>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.user}`}>
                  <img
                    src={msg.profilePic}
                    alt={`${msg.user} profile`}
                    className="chat-profile-pic"
                  />
                  <div className="chat-message-text">{msg.text}</div>
                </div>
              ))
            )}
            {botTyping && <TypingIndicator onComplete={handleTypingComplete} />}
            {displayedBotMessage && (
              <div className="chat-message bot">
                <img
                  src={Logo}
                  alt="bot profile"
                  className="chat-profile-pic"
                />
                <div className="chat-message-text">{displayedBotMessage}</div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="chat-input-container">
            <textarea
              className="chat-input"
              placeholder="Enter your prompt"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <SendButton isLoading={isLoading} onClick={handleSend} />{" "}
            {/* Use SendButton */}
          </div>
          <div className="disclaimer">
            <p>
              This chat bot can make mistakes. Don't share confidential info.
            </p>
          </div>

          {/* Conditionally render the VirtualCourts overlay */}
          {showVirtualCourts && (
            <div className="virtual-courts-overlay">
              <VirtualCourts onClose={() => setShowVirtualCourts(false)} />
            </div>
          )}
          {showlivestream && (
            <div className="virtual-courts-overlay">
              <LiveStream onClose={() => setShowlivestream(false)} />
            </div>
          )}
          {setting && (
            <div className="virtual-courts-overlay">
              <Settings
                onClose={() => setsetting(false)}
                toggle={toggleTheme}
                toggleState={theme}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
