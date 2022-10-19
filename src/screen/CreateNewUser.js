import React,{useEffect,useState} from 'react';
import '../style/CreateNewUser.css';
import UserId from '../components/UserId';
import Password from '../components/Password';
import EmailId from '../components/Email';
import PhoneNumber from '../components/Phone';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase_db';

const CreateNewUser = ()=>{
    const [user,setuser] = useState({});
    
    const store_to_Db = async()=>{
        const userId = document.getElementById('userId').value;
        const checkUser = (await getDoc(doc(db,'user',userId))).data();
        if(checkUser){
            console.log('userId already exsist...!');
            return;
        }else{
        try{
        await setDoc(doc(db,'user',userId),{
            userId: document.getElementById('userId').value,
            emailId: document.getElementById('emailId').value,
            phoneNmber: document.getElementById('phoneNmber').value,
            Password: document.getElementById('password').value,
            friends_list : [],
            messages : []
        });
    }
    catch(err){
        console.log(err);
        alert('Unable to store user details in db....!');
    }}
    }

    const checkNumber = ()=>{
        const phoneNmber = document.getElementById('phoneNmber').value;
    if(phoneNmber.length >=11 || phoneNmber.length <= 9){
        alert("Pls enter correct number....!")
    }
    }
    const sign_up = ()=>{
        // checkNumber();
        store_to_Db();
    }
    return(
        <div className="outerdiv creatediv">
            <center id="centre">
                <h1 id="signuptxt">Sign Up</h1>
                <section className="login">
                <h6 className="logIn">
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