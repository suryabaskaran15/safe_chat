import React from "react";
import { auth } from "../firebase_db";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div id="app-title">SAFE CHAT</div>
      <div id="signout" onClick={() => signOut(auth).then(() => navigate("/"))}>
        <FaSignOutAlt />
        signOut
      </div>
    </div>
  );
};
export default Header;
