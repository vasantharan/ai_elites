import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "../Stylesheet/Dropdown.css"; // Custom styles

function DropdownItem({ onVirtualCourtClick, onshowlivestream }) {
  const [activeSupremeCourt, setActiveSupremeCourt] = useState(false);
  const [activeService, setActiveService] = useState(false);
  const [activeEService, setActiveEService] = useState(false);

  const handleToggleSupremeCourt = () => {
    setActiveSupremeCourt((prev) => !prev);
    setActiveService(false); // Reset others when clicking on Supreme Court
    setActiveEService(false);
  };

  const handleToggleService = (e) => {
    e.stopPropagation(); // Prevent closing the parent dropdown
    setActiveService((prev) => !prev);
    setActiveEService(false);
  };

  const handleToggleEService = (e) => {
    e.stopPropagation(); // Prevent closing the parent dropdown
    setActiveEService((prev) => !prev);
    setActiveService(false);
  };

  return (
    <DropdownButton
      id="quicklink-dropdown"
      title="Quick Links"
      variant="light"
      autoClose={false} // Keep dropdown open until explicitly closed
    >
      <Dropdown.Item
        href="https://services.ecourts.gov.in/ecourtindia_v6/"
        target="_blank"
      >
        Case Status
      </Dropdown.Item>
      <Dropdown.Item onClick={onshowlivestream}>Live Stream</Dropdown.Item>
      <Dropdown.Item
        href="https://play.google.com/store/apps/details?id=in.telelaw.applicant&hl=en_IN/"
        target="_blank"
      >
        Tele-Law
      </Dropdown.Item>
      <Dropdown.Item onClick={onVirtualCourtClick}>Virtual Court</Dropdown.Item>

      {/* Supreme Court with Nested Dropdown */}
      <Dropdown show={activeSupremeCourt} drop="end" autoClose={false}>
        <Dropdown.Toggle
          id="nested-dropdown"
          onClick={handleToggleSupremeCourt}
          style={{
            backgroundColor: activeSupremeCourt ? "rgb(140 140 140)" : "white",
            color: activeSupremeCourt ? "white" : "black",
            width: "100%",
            fontSize: "14px",
            border: "none",
          }}
        >
          Supreme Court
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown show={activeService} drop="end" autoClose={false}>
            <Dropdown.Toggle
              id="nested-dropdown"
              onClick={handleToggleService}
              style={{
                backgroundColor: activeService ? "rgb(140 140 140)" : "white",
                border: "none",
                fontSize: "14px",
                width: "100%",
                color: activeService ? "white" : "black",
              }}
              className="custom-dropdown-toggle"
            >
              Services
            </Dropdown.Toggle>
            <Dropdown.Menu id="menu-item">
              <Dropdown.Item
                href="https://www.sci.gov.in/cause-list/"
                target="_blank"
              >
                Cause List
              </Dropdown.Item>
              <Dropdown.Item
                href="https://www.sci.gov.in/case-status-case-no/"
                target="_blank"
              >
                Case Status
              </Dropdown.Item>
              <Dropdown.Item
                href="https://www.sci.gov.in/daily-order-case-no/"
                target="_blank"
              >
                Daily Orders
              </Dropdown.Item>
              <Dropdown.Item
                href="https://www.sci.gov.in/judgements-case-no/"
                target="_blank"
              >
                Judgements
              </Dropdown.Item>
              <Dropdown.Item
                href="https://www.sci.gov.in/office-report-case-no/"
                target="_blank"
              >
                Office Reports
              </Dropdown.Item>
              <Dropdown.Item
                href="https://www.sci.gov.in/caveat-case-no/"
                target="_blank"
              >
                Caveat
              </Dropdown.Item>
              <Dropdown.Item
                href="https://www.sci.gov.in/display-boards/"
                target="_blank"
              >
                Display Boards
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown show={activeEService} drop="end" autoClose={false}>
            <Dropdown.Toggle
              id="nested-dropdown"
              onClick={handleToggleEService}
              style={{
                backgroundColor: activeEService ? "rgb(140 140 140)" : "white",
                color: activeEService ? "white" : "black",
                fontSize: "14px",
                border: "none",
                width: "100%",
              }}
              className="custom-dropdown-toggle"
            >
              E-Services
            </Dropdown.Toggle>
            <Dropdown.Menu id="menu-item">
              <Dropdown.Item href="https://efiling.sci.gov.in/" target="_blank">
                E-Filling
              </Dropdown.Item>
              <Dropdown.Item
                href="https://vjc.sci.gov.in/public/index.php"
                target="_blank"
              >
                Virtual Justice Clock
              </Dropdown.Item>
              <Dropdown.Item href="https://digiscr.sci.gov.in/" target="_blank">
                Digi SCR
              </Dropdown.Item>
              <Dropdown.Item
                href="https://suswagatam.sci.gov.in/public/Index.aspx"
                target="_blank"
              >
                SuSwagatam (e-pass)
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Dropdown.Menu>
      </Dropdown>
    </DropdownButton>
  );
}

export default DropdownItem;
