import React from 'react';
import '../style/CreateNewUser.css';
import UserId from '../components/UserId';
import Password from '../components/Password';
import EmailId from '../components/Email';
import PhoneNumber from '../components/Phone';
const CreateNewUser = ()=>{
    let user_details = [];
    
    const get_user_details = ()=>{
        let user = {
            userId: document.getElementById('userId').value,
            emailId: document.getElementById('emailId').value,
            phoneNmber: document.getElementById('phoneNmber').value,
            Password: document.getElementById('password').value
        }
        user_details.push(user);
        localStorage.setItem('user_details',JSON.stringify(user_details));
    }
    const checkNumber = ()=>{
        const phoneNmber = document.getElementById('phoneNmber').value;
    if(phoneNmber.length >=11 || phoneNmber.length <= 9){
        alert("Pls enter correct number....!")
    }
    }
    const sign_up = ()=>{
        checkNumber();
        get_user_details();
    }
    return(
        <div class="outerdiv creatediv">
            <center id="centre">
                <h1 id="signuptxt">Sign Up</h1>
                <section class="login">
                <h6 class="logIn">
                    Already have account ?   
                <a href='/'>Log In</a>
                </h6>
                </section>
                <form >
                    <UserId/>
                    <br/>
                    <EmailId/>
                    <br/>
                    <PhoneNumber/>
                    <br/>
                    <Password/>
            </form>
            <button id="signUpBtn" onClick={sign_up}>Sign Up</button>
            </center>
        </div>
    );
}

export default CreateNewUser;