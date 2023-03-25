import React from "react";
import { HiPhone } from "react-icons/hi";

const PhoneNumber = () => {
  return (
    <div>
      <HiPhone size={35} color="#4831D4" />
      <input
        id="phoneNumber"
        name="phoneNumber"
        type={"number"}
        className="textboxTheme"
      />
    </div>
  );
};

export default PhoneNumber;
