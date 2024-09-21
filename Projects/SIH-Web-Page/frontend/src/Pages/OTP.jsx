import React, { useState, useEffect } from 'react';
import OtpInput from 'react-otp-input';
import '../Stylesheet/OTP.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { resendOTP } from '../api';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';
import Spinner from 'react-bootstrap/Spinner';
import { verifyOTP } from '../api';


export default function Otp() {
  const navigate = useNavigate();
  const [inputOtp, setOtp] = useState('');
  const [disable, setdisable] = useState(true)
  const [countdown, setCountdown] = useState(60);
  const [loading, setloading] = useState(false)
  const [resendloading, setresendloading] = useState(false)
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setdisable(true);
    }
  }, [countdown]);

  const resetcounter = async () => {
    setloading(true)
    const trimmedOtp = inputOtp.trim();
    try {
      const response = await verifyOTP(trimmedOtp)
      if (response.data == 'User verification successfull') {
        navigate('/login')
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
    finally {
      setloading(false)
    }
  }
  const resendOtp = async () => {
    try {
      setresendloading(true)


      const response = await resendOTP();
      if (response.data == 'Resend OTP successfull') {
        toast.success('OTP resend')
        setCountdown(60)
        setdisable(false)
      }
    }
    catch (err) {
      console.log(`Error : {err}`)
    }
    finally {
      setresendloading(false)
    }
  }

  return (
    <div className='flex-div'>
    <div className='otp'>
      <div className='main-title'>Enter the OTP</div>
      <OtpInput
        value={inputOtp}
        onChange={setOtp}
        numInputs={4}
        renderSeparator={<span></span>}
        renderInput={(props) => <input {...props} />}
        containerStyle={{ display: "flex", gap: "2rem" }}
        inputStyle={{ width: "80px", height: "70px" ,borderRadius:"10px"}}

      /><br />
      <div className='otp-button'>
        <button onClick={resetcounter} className="main-button" > {loading ? <Spinner animation="border" size="sm" /> : 'verify otp'}
        </button>
        <button onClick={resendOtp} disabled={disable} className="main-button"> {resendloading ? <Spinner animation="border" size="sm" /> : `resend otp`}
        </button>

        <ToastContainer
          position='top-right' />
      </div>
    </div>
    </div>
  );
}

