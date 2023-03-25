import React from "react";
import { MdEmail } from "react-icons/md";

const EmailId = () => {
  return (
    <div className="input-container">
      <MdEmail size={40} color="#4831D4" />
      <input
        id="emailId"
        name="emailId"
        type={"email"}
        className="textboxTheme"
      />
    </div>
  );
};

export default EmailId;
