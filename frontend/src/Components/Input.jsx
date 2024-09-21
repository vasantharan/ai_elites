import React from "react";
import "../Stylesheet/Input.css";

function Input({ placeholder, type, state, setstate, name }) {
  return (
    <div className="input">
      <input
        type={type}
        placeholder={placeholder}
        onChange={(e) => setstate(e.target.value)}
      />
    </div>
  );
}

export default Input;
