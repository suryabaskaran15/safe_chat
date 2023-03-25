import React, { useEffect, useState } from "react";
import UploadPhoto from "./uploadPhoto";
import { auth, db } from "../firebase_db";
import { MdAddAPhoto } from "react-icons/md";
import { doc, getDoc } from "firebase/firestore";
const Profile = () => {
  const [phoneNum, setPhoneNum] = useState("");

  const userDetails = async () => {
    setPhoneNum(
      await (await getDoc(doc(db, "user", auth.currentUser.uid))).data()
        .phoneNumber
    );
  };
  useEffect(() => {
    userDetails();
  }, []);
  return (
    <div className="profile-setting">
      <h2 className="setting-main-lable">Profile</h2>
      <div>
        <form>
          <img src={auth.currentUser.photoURL} className="Img" />

          <UploadPhoto />
          <h4 className="inline-block">User Name </h4>
          <input
            type={"text"}
            className="border-bottom border-dark textboxTheme space-between"
            value={auth.currentUser.displayName}
          />
          <br />
          <h4 className="inline-block">Email Id </h4>
          <input
            type={"text"}
            className="border-bottom border-dark textboxTheme space-between"
            value={auth.currentUser.email}
          />
          <br />
          <h4 className="inline-block"> phone Number </h4>
          <input
            type={"tel"}
            className="border-bottom border-dark textboxTheme space-between"
            value={phoneNum}
          />
          <br />
          <button type="submit" id="Btn" className="">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
