import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Login.css';
import '../style/genderal.css';
import UserId from "../components/UserId";
import Password from "../components/Password";
import { useNavigate} from "react-router-dom";
import { db } from "../firebase_db";
import { doc, getDoc } from "firebase/firestore";

const Login = ()=>{
    let user;
    const verification_In_db = async(id,password)=>{
        user = (await getDoc(doc(db,'user',id))).data();
        if(id == user.userId && password == user.Password){
            navigate(`/${id}/messaging`);
        }else{
            alert("User Id not Found....!");
        }
    }
    
    const navigate = useNavigate();
    const verified = ()=>{
        const userId = document.getElementById('userId').value;
        const password = document.getElementById('password').value;
        verification_In_db(userId,password);
    }
    return(
        <div className="outerdiv logindiv " >
        <center className="centre">
            <h1>Login</h1>
            <UserId/>
            <br/>
            <Password/>
            <span className="LoginButton"><button id="Btn" onClick={verified}>LOGIN</button> </span>
            <div className="lowerPortion">
                <a href="/ForgotPassword">Forgot password....?   </a>   
                <a href="/Create">create new</a>
            </div>
            <br/>
       </center>
       </div>
    );
}

export default Login;

