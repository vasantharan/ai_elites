import React from "react";
import "../Stylesheet/Button.css";

function Button({ props, disable, setstate, text }) {
  return disable ? (
    <button className="main-button" onClick={setstate}>
      {props}
    </button>
  ) : (
    <button className="main-button" disabled>
      {props} <span style={{ paddingLeft: "5px" }}>{text}</span>
    </button>
  );
}

export default Button;
