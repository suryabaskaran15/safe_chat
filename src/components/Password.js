import React from "react";
import { IoIosLock } from "react-icons/io";

const Password = (props) => {
  return (
    <div className="input-container">
      <IoIosLock size={40} color="#4831D4" />
      <input
        id="password"
        name="password"
        className="textboxTheme"
        type={"password"}
        placeholder={props.placeHolder}
      />{" "}
      <br />
    </div>
  );
};

export default Password;
