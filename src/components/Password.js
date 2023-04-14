import React, { useState } from "react";
import { IoIosLock } from "react-icons/io";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
const Password = (props) => {
  const [isVisible,setIsVisible] = useState(false)
  function PasswordToggle(){
    setIsVisible(!isVisible);
    const elementType = document.getElementById('password');
    if(elementType.type === "password"){
      elementType.type = "text";
    }else{
      elementType.type = "password";
    }
  }

  return (
    <div className="input-container">
      <IoIosLock size={40} color="#4831D4" />
      <input
        id="password"
        name="password"
        className="textboxTheme"
        type={"password"}
        placeholder={props.placeHolder}
      />
      {isVisible ?
      <AiFillEye size={25} onClick={PasswordToggle}/>
      : 
      <AiFillEyeInvisible size={25} onClick={PasswordToggle}/>
      }
      <br />
    </div>
  );
};

export default Password;
