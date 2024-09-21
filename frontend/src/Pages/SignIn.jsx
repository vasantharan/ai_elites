import React, { useState } from 'react';
import Header from '../Components/Header';
import '../Stylesheet/background.css';
import Input from '../Components/Input';
import '../Stylesheet/signin.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { signin } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function SignIn() {
  const navigate = useNavigate();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email === '' || password === '') {
      return toast.warning('Enter the details');
    }
    if (!validateEmail(email)) {
      return toast.warning('Please enter a valid email');
    }
    try {
      const response = await signin({ email, password });
      console.log(response.data);
      if (response.data === 'Signin successfull') {
        navigate('/chat');
      }
      if(response.data === 'Verify your account to continue'){
        navigate('/otp')
      }
      if(response.data==='User not found'){
        return toast.warn("User not Found,Please Signup")
      }
       else {
        return toast.warning(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Header />
      <div className='flex-div'>
        <div className='whole-div'>
          <div className='signin-title'>Welcome back!</div>
          <form>
            <Input placeholder={"Email"} type={"text"} state={email} setstate={setemail} />
            <div className='password-field'>
              <Input 
                placeholder={"Password"} 
                type={showPassword ? "text" : "password"} 
                state={password} 
                setstate={setpassword} 
              />
              <FontAwesomeIcon 
                icon={showPassword ? faEye : faEyeSlash} 
                onClick={() => setShowPassword(!showPassword)}
                className='password-toggle-icon'
              />
            </div>
            <button className='main-button' onClick={handleSubmit}>Login</button>
            <ToastContainer position='top-right' />
          </form>
          <div className='login-nav'>
            New User? <Link to={'/signup'}>SIGN UP</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
