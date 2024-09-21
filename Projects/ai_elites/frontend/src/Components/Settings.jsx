import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5"; // Import the close icon
import ReactSwitch from "react-switch"; // Import the switch component
import "../Stylesheet/Chat.css";

const Settings = ({ onClose, toggle, toggleState }) => {
  const [activeSetting, setActiveSetting] = useState("General");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", toggleState);
  }, [toggleState]);

  const settingsCategories = [
    "General",
    //"Appearance",
    //"Privacy",
    //"Notifications",
    //"Account",
  ];
  const renderSettingsContent = () => {
    switch (activeSetting) {
      case "General":
        return (
          <div style={generalSettingsStyle}>
            <div style={settingItemStyle}>
              <div style={settingTitleStyle}>Theme</div>
              <div className="toggle">
                <ReactSwitch
                  onChange={toggle}
                  checked={toggleState === "dark"}
                  offColor="#E5E5E5"
                  onColor="#4D4D4D"
                  onHandleColor="#FFFFFF"
                  offHandleColor="#666667"
                  checkedIcon={false}
                  uncheckedIcon={false}
                  handleDiameter={30}
                  height={20}
                  width={48}
                />
              </div>
            </div>
          </div>
        );
      default:
        return <div>Select a setting category</div>;
    }
  };

  return (
    <div style={overlayContainerStyle}>
      <div style={overlayStyle}>
        <IoClose
          style={closeIconStyle}
          onClick={onClose}
          className="close-icon"
        />
        <div style={mainStyle}>
          <div style={settingsPageStyle}>
            <div style={sidebarStyle}>
              {settingsCategories.map((category) => (
                <div
                  key={category}
                  style={
                    category === activeSetting
                      ? activeCategoryStyle
                      : categoryStyle
                  }
                  onClick={() => setActiveSetting(category)}
                >
                  {category}
                </div>
              ))}
            </div>
            <div style={contentStyle}>
              <h2 style={h2Style}>{activeSetting}</h2>
              {renderSettingsContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const generalSettingsStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  padding: "10px",
};

const settingItemStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "70em",
};

const settingTitleStyle = {
  fontSize: "18px",
  fontWeight: "500",
  color: "#fff",
};

const overlayContainerStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const overlayStyle = {
  backgroundColor: "#2F2F2F",
  width: "80vw",
  height: "80vh",
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  padding: "20px",
  overflowY: "auto",
};

const closeIconStyle = {
  position: "absolute",
  top: "15px",
  right: "15px",
  fontSize: "24px",
  cursor: "pointer",
  color: "#fff",
};

const mainStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const settingsPageStyle = {
  display: "flex",
  width: "100%",
  backgroundColor: "transparent",
  height: "100%",
  borderRadius: "8px",
  overflow: "hidden",
};

const sidebarStyle = {
  width: "20%",
  backgroundColor: "transparent",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  color: "#fff",
  borderRight: "1px solid #B4B4B4",
};

const categoryStyle = {
  padding: "10px 15px",
  cursor: "pointer",
  borderRadius: "4px",
  marginBottom: "10px",
  backgroundColor: "transparent",
  color: "white",
  transition: "background-color 0.3s",
};

const activeCategoryStyle = {
  padding: "10px 15px",
  cursor: "pointer",
  borderRadius: "4px",
  marginBottom: "10px",
  backgroundColor: "#34495e", // Highlight active category
  transition: "background-color 0.3s",
  color: "white",
};

const contentStyle = {
  width: "75%",
  backgroundColor: "transparent",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
};

const h2Style = {
  marginBottom: "20px",
  fontSize: "24px",
  fontWeight: "bold",
  color: "white",
};

export default Settings;
