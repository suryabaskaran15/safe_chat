import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { RiLoginBoxFill } from "react-icons/ri";
import UserId from "../components/UserId";
import Password from "../components/Password";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase_db";
import { doc, getDoc } from "firebase/firestore";

const Login = () => {
  const navigate = useNavigate();
  let user;
  const verification_In_db = async (id, password) => {
    user = (await getDoc(doc(db, "user", id))).data();
    if (id == user.userId && password == user.Password) {
      navigate(`/${id}/messaging/welcome`);
    } else {
      alert("User Id not Found....!");
    }
  };

  const verified = () => {
    const userId = document.getElementById("userId").value;
    const password = document.getElementById("password").value;
    verification_In_db(userId, password);
  };
  return (
    <div className="outerdiv logindiv">
      <center className="centre centreTheme">
        <h1 className="login-header">Login</h1>
        <UserId />
        <br />
        <Password />
        <div className="LoginButton">
          <button id="Btn" onClick={verified}>
            <RiLoginBoxFill size={20} color="#4831D4" />
            LOGIN
          </button>
        </div>
        <div className="lowerPortion">
          <a href="/ForgotPassword">Forgot password....? </a>
          <a href="/Create">create new</a>
        </div>
        <br />
      </center>
    </div>
  );
};

export default Login;
