import React, { useEffect, useState } from "react";
import UploadPhoto from "./uploadPhoto";
import { auth, db, storage } from "../firebase_db";
import unknowDp from "../assets/profile.png"
import { MdAddAPhoto,MdVerified } from "react-icons/md";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Alert, Button, Input } from "@mui/material";
import { sendEmailVerification, updateCurrentUser, updateEmail, updatePhoneNumber, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getUserDetails } from "../util/function_Module";
const Profile = () => {
  const [phoneNum, setPhoneNum] = useState("");
  const [userName, setUserName] = useState(auth.currentUser.displayName);
  const [email, setEmail] = useState(auth.currentUser.email);
  const [dp,setDp] = useState(auth.currentUser.photoURL);
  const [isUpdate,setIsUpdate] = useState(false);
  const handleUpdate = ()=>{
    setDp(!dp);
  }
  const userDetails = async () => {
    setPhoneNum(
      await (await getDoc(doc(db, "user", auth.currentUser.uid))).data()
        .phoneNumber
    );
  };
  const emailVerify = ()=>{
    sendEmailVerification(auth.currentUser)
  }
  const update_profile = async(e) => {
    e.preventDefault();
    if(e.target[0].files[0]){
      await uploadBytes(
        ref(storage, `${auth.currentUser.uid}/profilePic/profilePic`),
        e.target[0].files[0]
      ).then((res) => {
        getDownloadURL(
          ref(storage, `${auth.currentUser.uid}/profilePic/profilePic`)
        ).then(async (url) => {
          await updateProfile(auth.currentUser, {
            photoURL: url,
          })
          setDp(url)
          await updateDoc(doc(db,"user",auth.currentUser.uid),{
            photoURL : url
          })
        console.log(auth.currentUser.uid)
        });
    })
  }
  if(auth.currentUser.email != email){
    updateEmail(auth.currentUser,e.target[2].value)
      .then(async(res)=>{
        setEmail(e.target[2].value)
        await updateDoc(doc(db,"user",auth.currentUser.uid),{
          email : e.target[2].value
        })
        console.log(auth.currentUser);
      })
      .catch((err)=>{console.log(err)})
  }
  if(auth.currentUser.displayName != userName){
    const userAvailable =  await getUserDetails(userName);
    if(!userAvailable){
      await updateDoc(doc(db,"user",auth.currentUser.uid),{
        userName : e.target[1].value
      })
      await updateProfile(auth.currentUser, {
        displayName: e.target[1].value,
      })
      console.log(auth.currentUser);
    }else{
      alert("user Name already available");
    }
  }
  if(auth.currentUser.phoneNumber != phoneNum){
    console.log("phone")
    await updateProfile(auth.currentUser,{
      phoneNumber : e.target[3].value
    }).then(()=>{console.log("com",auth.currentUser)})
  }
}
  useEffect(() => {
    userDetails();
  }, []);
  return (
    <div className="profile-setting">
      <h2 className="setting-main-lable">Profile</h2>
      <div>
        <form onSubmit={update_profile}>
          <img src={dp ? dp: unknowDp } className="Img" />
          <br/>
          <MdAddAPhoto size={40} color="#4831D4" />
          <input
            type="file"
            className="profile-pic textboxTheme"
            id="profilePic"
            name="profilePic"
          />
          <br/>
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
          {
            auth.currentUser.emailVerified 
            ? <MdVerified size={25}/>
            :<Button onClick={emailVerify}>verify your email</Button>
          }
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
