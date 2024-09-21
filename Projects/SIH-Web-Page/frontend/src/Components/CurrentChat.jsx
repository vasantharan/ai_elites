import React from "react";
import "../Stylesheet/CurrentChat.css";
import { IoMdSend } from "react-icons/io";

function CurrentChat({ placeholder, type, state, setstate, click }) {
  const checkKey = (e) => {
    if (e.key === "Enter") {
      click();
    }
  };
  return (
    <div className="input1" onKeyDown={(e) => checkKey(e)}>
      <input
        type={type}
        placeholder={placeholder}
        value={state}
        onChange={(e) => setstate(e.target.value)}
      />
      <div onClick={click}>
        <IoMdSend size={"35px"} />
      </div>
    </div>
  );
}

export default CurrentChat;
