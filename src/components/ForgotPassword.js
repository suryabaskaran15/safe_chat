import React from 'react';
import {MdError,MdEmail} from "react-icons/md";
import {BiArrowBack} from 'react-icons/bi';
import '../style/ForgotPassword.css';
const ForgotPassword = ()=>{
    return(
        <div id='outerdiv'>
            <center id='center'>
                <MdError size={75} color='blue'/>
                <h2>Forgot Password</h2>
                <p>
                    Enter your email and we'll send you a otp 
                    for conformation
                </p>
                <div class="input-container">
                    <MdEmail size={40} color='blue'/>
                    <input id ='emailId' type={'email'} class="col-xs-15 border border-3 border-dark"/>
            </div>
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