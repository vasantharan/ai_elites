import axios from "axios";

const api_url = "http://localhost:5000";
axios.defaults.withCredentials = true;

export const signup = async ({ email, password, name }) => {
  try {
    const response = await axios.post(`${api_url}/signup`, {
      email,
      password,
      name,
    });
    console.log("Document Cookies:", document.cookie);
    return response;
  } catch (error) {
    console.error("Error in sign up: ", error);
    return "Error in reaching server";
  }
};

export const signin = async ({ email, password }) => {
  try {
    const response = await axios.post(`${api_url}/signin`, { email, password });
    return response;
  } catch (error) {
    console.error("Error Signing in:", error);
    return "Error in reaching server";
  }
};

export const verifyOTP = async (data) => {
  try {
    const response = await axios.post(`${api_url}/verifyotp`, {otp:data});
    return response;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return "Error in reaching server"
  }
};

export const resendOTP = async () => {
    try {
        const response = await axios.get(`${api_url}/resendotp`,{})
        return response
    } catch (error) {
        console.error('Error sending OTP:', error)
        return "Error in reaching server"
    }
}

export const handleNewChat = async () => {
  try {
    const response = await axios.get(`${api_url}/newchat`);
    return response.data;
  } catch (error) {
    console.error('Error starting new chat:', error);
    throw error;
  }
};

export const chat = async (data) => {
  try {
    const response = await axios.post(`${api_url}/chat`, data);
    console.log(response);
    return response.data; // Ensure this is a string
  } catch (error) {
    console.error('Error in chat API:', error);
    throw error;
  }
};

export const fetchChatHistory = async () => {
  try {
    const response = await axios.get(`${api_url}/chathis`);
    return response.data.history;
  } catch (error) {
    console.error('Error fetching chat history:', error);
    throw error;
  }
};

export const chatRetrive = async({chatid:chatid}) =>{
  try {
    const response = await axios.post(`${api_url}/message`, { chatid: chatid });
    return response.data
  } catch (error) {
    console.error('Failed to fetch chat details:', error);
  }
}