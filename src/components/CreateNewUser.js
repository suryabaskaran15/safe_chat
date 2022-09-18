import React from 'react';
import { FaUserAlt } from "react-icons/fa";
import {IoIosLock} from "react-icons/io";
import {MdEmail} from "react-icons/md";
import{HiPhone} from "react-icons/hi";
import '../style/CreateNewUser.css';
const CreateNewUser = ()=>{
    const checkNumber = ()=>{
        const phoneNmber = document.getElementById('phoneNmber').value;
        console.log(phoneNmber.lenth);
    if(phoneNmber.lenth >=9 && phoneNmber.lenth <= 9){
        console.log(phoneNmber);
        alert("Pls enter correct number....!")
    }
    }
    
    return(
        <div class="outerdiv">
            <center id="centre">
                <h1 id="signuptxt">Sign Up</h1>
                <section class="login">
                <h6 class="logIn">
                    Already have account ?   
                <a href='/'>Log In</a>
                </h6>
                </section>
            <div class="input-container userNameDiv" >
            <FaUserAlt size={33} color='blue'/>
            <input id='userId' type={'text'} class="col-xs-15 border border-3 border-dark"/>
            </div>
            <br/>
            <div class="input-container">
            <MdEmail size={40} color='blue'/>
            <input id ='emailId' type={'email'} class="col-xs-15 border border-3 border-dark"/>
            </div>
            <br/>
            <div>
            <HiPhone size={35} color='blue'/>
            <input id ='phoneNmber' type={'tel'} class="col-xs-15 border border-3 border-dark"/>
            </div>
            <br/>
            <div class="input-container passwordDiv">
            <IoIosLock size={40} color='blue'/>
            <input id='password' type={"password"} class="col-xs-15 border border-3 border-dark"/> <br/>
            </div>
            <button id="signUpBtn" onClick={checkNumber}>Sign Up</button>
            </center>
        </div>
    );
}

export default CreateNewUser;