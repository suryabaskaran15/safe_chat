import { confirmPasswordReset } from "firebase/auth";
import React, { useRef } from "react";
import { IoIosLock } from "react-icons/io";
import { auth } from "../firebase_db";
import Password from "../components/Password";
import { Button } from "@mui/material";

const ResetPassword = () => {
  const FormRef = useRef();
  const url = new URLSearchParams(window.location.search);
  const updatePassword = async (event) => {
    event.preventDefault();
    console.log(FormRef.current[0].value);
    console.log(FormRef.current[1].value);
    if (FormRef.current[0].value === FormRef.current[1].value) {
      await confirmPasswordReset(
        auth,
        url.get("oobCode"),
        FormRef.current[1].value
      )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    } else {
      alert("please check your password");
    }
  };
  return (
    <div className="outerdiv">
      <center id="center" className="centreTheme">
        <IoIosLock size={70} color="blue" />
        <h2>New Password</h2>
        <form ref={FormRef} onSubmit={updatePassword}>
          <Password placeHolder={"New password"} />
          <Password placeHolder={"Confrim password"} />
          <Button id="Btn" type="submit">
            Reset
          </Button>
        </form>
      </center>
    </div>
  );
};
export default ResetPassword;
