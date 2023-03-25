import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { RiLoginBoxFill } from "react-icons/ri";
import Password from "../components/Password";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase_db";
import { signInWithEmailAndPassword } from "firebase/auth";
import EmailId from "../components/Email";
const Login = () => {
  const FormRef = useRef();
  const navigate = useNavigate();
  const userCredentials = {
    displayName: "surya15",
  };
  const verify = (event) => {
    const emailId = FormRef.current.emailId.value;
    const password = FormRef.current.password.value;
    event.preventDefault();
    signInWithEmailAndPassword(auth, emailId, password)
      .then(async (response) => {
        await navigate(`/${response.user.displayName}/messaging/welcome`);
      })
      .catch((error) => alert("Please enter the correct User Id and password"));
  };
  return (
    <div className="outerdiv logindiv">
      <center className="centre centreTheme">
        <h1 className="login-header">Login</h1>
        <form ref={FormRef} onSubmit={verify}>
          <EmailId />
          <br />
          <Password />
          <div className="LoginButton">
            <button id="Btn" type="submit">
              <RiLoginBoxFill size={20} color="#4831D4" />
              LOGIN
            </button>
          </div>
        </form>
        <div className="lowerPortion">
          <a href={`/ForgotPassword/?reset = false`}>Forgot password....? </a>
          <a href="/Create">create new</a>
        </div>
        <br />
      </center>
    </div>
  );
};

export default Login;
