import React from "react";
import { IoClose } from "react-icons/io5";
import "../Stylesheet/VirutalCourt.css";
import court from "../JSON/virtualCourt.json";

function VirtualCourts({ onClose }) {
  return (
    <div style={overlayContainerStyle}>
      <div style={overlayStyle}>
        <IoClose
          style={closeIconStyle}
          onClick={onClose}
          className="close-icon"
        />
        <h3
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
            paddingTop: "10px",
          }}
        >
          Virtual Courts
        </h3>
        <br />
        <div style={main}>
          <div style={boxStyle1}>
            <p>
              <a
                href={court[0].link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "white", textDecoration: "none" }}
              >
                {court[0].name}
              </a>
            </p>
          </div>
        </div>
        <div style={scrollableGridContainerStyle}>
          <div style={gridContainerStyle}>
            {court.map((court) =>
              court.id > 1 ? (
                <div key={court.id} style={boxStyle}>
                  <p>
                    <a
                      href={court.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      {court.name}
                    </a>
                  </p>
                </div>
              ) : null,
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Styles
const overlayContainerStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 9999,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const overlayStyle = {
  position: "relative",
  backgroundColor: "#282828",
  padding: "20px",
  borderRadius: "30px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  width: "80%",
  maxWidth: "1200px",
};

const closeIconStyle = {
  position: "absolute",
  top: "-60px",
  right: "-40px",
  color: "white",
  cursor: "pointer",
  fontSize: "34px",
};

const scrollableGridContainerStyle = {
  maxHeight: "500px", // Set the maximum height for the scrollable area
  overflowY: "auto", // Enable vertical scrolling
};

const gridContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: "20px",
};

const boxStyle = {
  padding: "20px",
  backgroundColor: "#212020",
  borderRadius: "20px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  color: "white",
  textAlign: "center",
  fontWeight: "bolder",
  fontSize: "24px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const boxStyle1 = {
  padding: "20px",
  width: "500px",
  borderRadius: "20px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#212020",
  color: "white",
  fontWeight: "bolder",
  fontSize: "24px",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const main = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingBottom: "20px",
};

export default VirtualCourts;
