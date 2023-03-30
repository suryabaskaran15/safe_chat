import React, { useEffect, useState } from "react";
import UploadPhoto from "./uploadPhoto";
import { auth, db } from "../firebase_db";
import { MdAddAPhoto } from "react-icons/md";
import { doc, getDoc } from "firebase/firestore";
import { Input } from "@mui/material";
const Profile = () => {
  const [phoneNum, setPhoneNum] = useState("");
  const [updateDetails, setUpdateDetails] = useState("");
  const [userName, setUserName] = useState(auth.currentUser.displayName);
  const [email, setEmail] = useState(auth.currentUser.email);
  const userDetails = async () => {
    setPhoneNum(
      await (await getDoc(doc(db, "user", auth.currentUser.uid))).data()
        .phoneNumber
    );
  };
  const update_profile = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    userDetails();
    console.log("updateDetails", updateDetails);
  }, []);
  return (
    <div className="profile-setting">
      <h2 className="setting-main-lable">Profile</h2>
      <div>
        <form onSubmit={update_profile}>
          <img src={auth.currentUser.photoURL} className="Img" />
          <UploadPhoto />
          <h4 className="inline-block">User Name </h4>
          <input
            type={"text"}
            className="border-bottom border-dark textboxTheme space-between"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <br />
          <h4 className="inline-block">Email Id </h4>
          <input
            type={"text"}
            className="border-bottom border-dark textboxTheme space-between"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />
          <h4 className="inline-block"> phone Number </h4>
          <input
            type={"tel"}
            className="border-bottom border-dark textboxTheme space-between"
            value={phoneNum}
            onChange={(e) => {
              setPhoneNum(e.target.value);
            }}
          />
          <br />
          <button type="submit" id="Btn" className="update-Btn">
            update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
