import React from "react";
import { Dropdown, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Settings from "../Components/Settings";

function ProfileDropdown({ profileImageUrl, setSetting }) {
  const navigate = useNavigate();
  function deleteAllCookies() {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      const cookieName = cookie.split("=")[0].trim();
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
  }

  const handleNavigate = (path) => {
    if (path == "/logout") {
      deleteAllCookies();
      navigate("/login");
    } else navigate(path);
  };
  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        as="div"
        id="profile-dropdown"
        style={{ cursor: "pointer" }}
      >
        <Image
          src={profileImageUrl}
          roundedCircle
          alt="Profile Photo"
          style={{ width: "60px", height: "60px" }}
        />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={setSetting}>Settings</Dropdown.Item>
        <Dropdown.Item onClick={() => handleNavigate("/logout")}>
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ProfileDropdown;
