import { Input } from "@mui/material";
import React from "react";
import { MdAddAPhoto } from "react-icons/md";

const UploadPhoto = () => {
  return (
    <div className="input-container ">
      <MdAddAPhoto size={40} color="#4831D4" />
      <input 
        type="file"
        className="profile-pic textboxTheme"
        id="profilePic"
        name="profilePic"
      />
    </div>
  );
};

export default UploadPhoto;
