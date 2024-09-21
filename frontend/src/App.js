import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Pages/Main";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Chat from "./Pages/Chat";
import Otp from "./Pages/OTP";
import NotFound from "./Pages/NotFound";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/login" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route
          path="/chat"
          element={
            // <PrivateRoute>
            <Chat />
            //</PrivateRoute>
          }
        ></Route>
        <Route path="/otp" element={<Otp />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

