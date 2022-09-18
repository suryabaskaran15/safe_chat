import React from "react";
import { FaUserAlt } from "react-icons/fa";
import {IoIosLock} from "react-icons/io";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Login.css';

const Login = ()=>{
    return(
        <div class="outerDiv" >
        <center class="centre">
            <h1>Login</h1>
            <div class="input-container">
            <FaUserAlt size={33} color='blue'/>
            <input id='userId' type={'text'} class="col-xs-15 border border-3 border-dark"/>
            </div>
            <br/>
            <div class="input-container">
            <IoIosLock size={40} color='blue'/>
            <input id='password' type={"password"} class="col-xs-15 border border-3 border-dark"/> <br/>
            </div>
            <span class="LoginButton"><button id="Btn">LOGIN</button> </span>
            <div class="lowerPortion">
                <a href="/ForgotPassword">Forgot password....?   </a>   
                <a href="/Create">create new</a>
            </div>
            <br/>
       </center>
       </div>
    );
}

export default Login;

