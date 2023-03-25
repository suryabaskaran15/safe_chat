import React from "react";
import { IoMdArrowForward, IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Profile from "../components/profile";

const Setting = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(false);
  return (
    <div className="outerdiv">
      <div className="setting">
        <div className="setting-Index">
          <h2 className="setting-lable">
            <IoMdArrowRoundBack
              size={40}
              id="back-btn"
              onClick={() => navigate(-1)}
            />
            Setting
          </h2>
          <ul className="setting-option">
            <li onClick={() => setProfile(true)}>
              profile
              <IoMdArrowForward className="forward-arrow" />
            </li>
          </ul>
        </div>
        <div className="main-setting">{profile && <Profile />}</div>
      </div>
    </div>
  );
};

export default Setting;
