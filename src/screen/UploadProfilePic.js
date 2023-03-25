import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useRef, useState } from "react";
import UploadPhoto from "../components/uploadPhoto";
import { auth, storage } from "../firebase_db";

const UploadProfilePic = () => {
  const FormRef = useRef();
  const [file, setFile] = useState(null);
  const updatePic = async (e) => {
    e.preventDefault();
    console.log(auth.currentUser);
    const file = e.target[0].files[0];
    await uploadBytes(ref(storage, `${auth.currentUser.uid}/profilePicture/profilePic`), file)
      .then((res) => {
        getDownloadURL(ref(storage, `${auth.currentUser.uid}/profilePicture/profilePic`))
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="outerdiv">
      <center id="uploadPic" className="centreTheme">
        <h3>Upload profile Picture</h3>
        <form ref={FormRef} onSubmit={updatePic}>
          <UploadPhoto />
          <input type={"submit"} />
        </form>
      </center>
    </div>
  );
};

export default UploadProfilePic;
