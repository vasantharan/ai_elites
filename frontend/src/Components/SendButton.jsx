import React, { useState } from 'react';
import '../Stylesheet/SendButton.css'
import { IoMdSend } from 'react-icons/io';

function SendButton({ isLoading, onClick }) {
  return (
    <div className="send-button" onClick={onClick}>
      {isLoading ? (
        <div className="loading-icon"></div>
      ) : (
        <IoMdSend size={"35px"} className='send-icon' />
      )}
    </div>
  );
}

export default SendButton;