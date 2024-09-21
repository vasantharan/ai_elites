// Box.js
import React from 'react';
import '../Stylesheet/Box.css'; // Make sure you have the correct path

const Box = ({ text, onClick }) => {
  return (
    <div className="box" onClick={onClick}>
      {text}
    </div>
  );
};

export default Box;
