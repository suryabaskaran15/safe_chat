import React, { useRef } from "react";
import { MdError, MdEmail } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import EmailId from "../components/Email";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase_db";
import { useParams } from "react-router-dom";
const ForgotPassword = () => {
  const { resetPassword } = useParams();
  const FormRef = useRef();
  const sendEmail = (event) => {
    event.preventDefault();
    console.log(FormRef.current.emailId.value);
    return sendPasswordResetEmail(auth, FormRef.current.emailId.value)
      .then(() =>
        alert("Email send to ", FormRef.current.emailId.value, "check it.")
      )
      .catch((err) => console.log(err));
  };
  const url = new URLSearchParams(window.location.search);
  console.log(window.location.search);
  console.log(url.has("reset"));
  return (
    <div className="outerdiv forgotpassworddiv">
      <center id="center" className="centreTheme">
        <MdError size={75} color="blue" />
        <h2>Forgot Password</h2>
        <p>Enter your email and we'll send you a otp for conformation</p>
        <form ref={FormRef} onSubmit={sendEmail}>
          <EmailId />
          <button id="Btn" type="submit">
            Send
          </button>
        </form>
        <br />
        <a href="/">
          <BiArrowBack />
          <p>Back to log-In</p>
        </a>
      </center>
    </div>
  );
};

export default ForgotPassword;
