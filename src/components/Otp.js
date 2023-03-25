import React from "react";
import { RiMailSendFill } from "react-icons/ri";
const Otp = () => {
  return (
    <div>
      <RiMailSendFill size={40} color="#4831D4" />
      <input type={"number"} id="otpField" className="textboxTheme" />
    </div>
  );
};

export default Otp;
