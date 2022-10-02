import React from 'react';
import {MdError,MdEmail} from "react-icons/md";
import {BiArrowBack} from 'react-icons/bi';
import EmailId from '../components/Email';
import '../style/ForgotPassword.css';
const ForgotPassword = ()=>{
    return(
        <div class='outerdiv forgotpassworddiv'>
            <center id='center'>
                <MdError size={75} color='blue'/>
                <h2>Forgot Password</h2>
                <p>
                    Enter your email and we'll send you a otp 
                    for conformation
                </p>
                <EmailId/>
            <button id='Btn'>Send</button>
            <br/>
            <a href='/'>
            <BiArrowBack/>
            <p>Back to log-In</p>
            </a>
            </center>
        </div>
    );
}

export default ForgotPassword;