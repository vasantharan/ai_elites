import React, { useState, useEffect } from "react";
import "../Stylesheet/TypingIndicator.css";

function TypingIndicator({ onComplete }) {
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      setIsTyping(false);
      onComplete();
    }, 10000);

    return () => clearTimeout(typingTimeout);
  }, [onComplete]);

  if (isTyping) {
    return (
      <div className="typing-indicator">
        Typing<span className="dots"></span>
      </div>
    );
  }

  return null;
}

export default TypingIndicator;

