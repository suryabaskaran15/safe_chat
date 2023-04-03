import React, { useEffect, useRef, useState } from "react";
import UserId from "../components/UserId";
import Password from "../components/Password";
import EmailId from "../components/Email";
import PhoneNumber from "../components/Phone";
import { RiLoginBoxFill } from "react-icons/ri";
import {
  doc,
  setDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase_db";
import { useNavigate } from "react-router-dom";
import { Input } from "@mui/material";
import UploadPhoto from "../components/uploadPhoto";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

const CreateNewUser = () => {
  const [user, setuser] = useState({});
  const FormRef = useRef();
  const navigate = useNavigate();
  const [file, setfile] = useState(null);
  const check = async (e) => {
    e.preventDefault();
    const files = e.target[4].files[0];
    console.log(file, e.target[4].files[0]);
    await uploadBytes(
      ref(storage, `surya/profilePic/${files.name}`),
      files
    ).then(() => {
      getDownloadURL(ref(storage, `surya/profilePic/${files.name}`)).then(
        (url) => {
          console.log(url);
        }
      );
    });
  };
  const verifyUserName = async (event) => {
    const dbResponse = await getDocs(
      query(
        collection(db, "user"),
        where("userName", "==", FormRef.current.userId.value)
      )
    );
    let response;
    dbResponse.forEach((doc) => {
      response = doc.exists();
    });
    return response;
  };
  const createAccount = async (event) => {
    event.preventDefault();
    setuser({
      userName: event.target[0].value,
      email: event.target[1].value,
      phone: event.target[2].value,
      password: event.target[3].value,
      profilePic: event.target[4].files[0],
    });
    await verifyUserName(event).then(async (res) => {
      if (res != true) {
        console.log(user);
        await createUserWithEmailAndPassword(
          auth,
          FormRef.current.emailId.value,
          FormRef.current.password.value
        )
          .then(async (response) => {
            console.log("user", user);
            console.log("authentication created :", response);
            await updateProfile(auth.currentUser, {
              displayName: event.target[0].value,
            });
            if (event.target[4].files[0]) {
              await uploadBytes(
                ref(storage, `${auth.currentUser.uid}/profilePic/profilePic`),
                event.target[4].files[0]
              ).then((res) => {
                getDownloadURL(
                  ref(storage, `${auth.currentUser.uid}/profilePic/profilePic`)
                ).then(async (url) => {
                  await updateProfile(auth.currentUser, {
                    photoURL: url,
                  });
                });
              });
            }
            await setDoc(doc(db, "user", auth.currentUser.uid), {
              uid: auth.currentUser.uid,
              userName: event.target[0].value,
              phoneNumber: event.target[2].value,
              friendList: [],
              photoURL: auth.currentUser.photoURL,
            });
          })
          .then(() => navigate("/"))
          .catch((error) => console.log(error));
      } else {
        console.log(res);
        alert("user name already exsist");
      }
    });
  };

  return (
    <div className="outerdiv creatediv">
      <center id="centre" className="centreTheme">
        <h1 id="signuptxt">Sign Up</h1>
        <section className="login">
          <h6 className="logIn">
            Already have account ?
            <a href="/">
              <RiLoginBoxFill size={20} color="#4831D4" />
            </a>
          </h6>
        </section>
        <form ref={FormRef} onSubmit={createAccount}>
          <UserId />
          <br />
          <EmailId />
          <br />
          <PhoneNumber />
          <br />
          <Password />
          <br />
          <input
            type="file"
            className="profile-pic textboxTheme"
            id="profilePic"
            name="profilePic"
            onChange={(e) => setfile(e.target.value)}
          />
          <br />
          <button id="signUpBtn" type="submit">
            Sign Up
          </button>
        </form>
      </center>
    </div>
  );
};

export default CreateNewUser;
