import React from "react";
import Previous from "./Previous";
import { IoClose } from "react-icons/io5";

const MobilePrevious = ({ onClose, onNewChat }) => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "#171717",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      {/* Passing onNewChat to Previous */}
      <Previous onNewChat={onNewChat} />
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          color: "white",
          cursor: "pointer",
        }}
        onClick={onClose} // Calls the onClose function passed from the parent
      >
        <IoClose size={28} />
      </div>
    </div>
  );
};

export default MobilePrevious;
