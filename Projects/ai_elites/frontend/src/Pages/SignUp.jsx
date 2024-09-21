import React, { useState } from "react";
import Header from "../Components/Header";
import "../Stylesheet/background.css";
import Input from "../Components/Input";
import "../Stylesheet/signin.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { signup } from "../api";
import Spinner from "react-bootstrap/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function SignUp() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [name, setname] = useState("");
  const [loading, setloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCpassword, setShowCpassword] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Example: At least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setloading(true); // Start loading spinner

    if (!email || !name || !password || !cpassword) {
      setloading(false); // Stop loading spinner if validation fails
      return toast.warning("Please fill in all fields");
    }
    if (!validateEmail(email)) {
      setloading(false);
      return toast.warning("Please enter a valid email");
    }
    if (!validatePassword(password)) {
      setloading(false);
      return toast.warning(
        "Password must contains uppercase, lowercase, number, special character, and be at least 8 characters long",
      );
    }
    if (password !== cpassword) {
      setloading(false);
      return toast.warning("Passwords do not match");
    }

    try {
      const response = await signup({ email, password, name });
      console.log(response.data);
      if (response.status === 201) {
        navigate("/otp");
      }
      if (response.data == "Account already exists") {
        toast.warn("Account exist, Please login");
      }
    } catch (error) {
      toast.error("Signup failed. Please try again.");
    } finally {
      setloading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex-div">
        <div className="whole-div">
          <div className="signin-title">Create an Account</div>
          <form>
            <Input
              placeholder={"Email"}
              type={"text"}
              state={email}
              setstate={setemail}
            />
            <Input
              placeholder={"Name"}
              type={"text"}
              state={name}
              setstate={setname}
            />
            <div className="password-field">
              <Input
                placeholder={"Password"}
                type={showPassword ? "text" : "password"}
                state={password}
                setstate={setpassword}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle-icon"
              />
            </div>
            <div className="password-field">
              <Input
                placeholder={"Confirm Password"}
                type={showCpassword ? "text" : "password"}
                state={cpassword}
                setstate={setcpassword}
              />
              <FontAwesomeIcon
                icon={showCpassword ? faEye : faEyeSlash}
                onClick={() => setShowCpassword(!showCpassword)}
                className="password-toggle-icon"
              />
            </div>
            <button
              className="main-button"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <Spinner animation="border" size="sm" /> : "SignUp"}
            </button>
            <ToastContainer position="top-right" />
          </form>
          <div className="login-nav">
            Already a user? <Link to={"/login"}>Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
