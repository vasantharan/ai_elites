import React from "react";
import Logo from "../assets/chatbot_logo.png";
import "../Stylesheet/Header.css";

const Header = () => {
  return (
    <div className="header-logo">
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>
      <div className="title">Chat Justice</div>
    </div>
  );
};
export default Header;
