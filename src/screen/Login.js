import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Login.css';
import '../style/genderal.css';
import UserId from "../components/UserId";
import Password from "../components/Password";
import { useNavigate} from "react-router-dom";


const Login = ()=>{
    const user_details_In_Db = JSON.parse(localStorage.getItem('user_details'));
    let user;
    const check_In_Db = (id)=>{
        user = user_details_In_Db.find(res=>res.userId == id);
    }
    const navigate = useNavigate();
    const verified = ()=>{
        const userId = document.getElementById('userId').value;
        const password = document.getElementById('password').value;
        check_In_Db(userId);
        if(userId == user.userId && password == user.Password){
            navigate(`/${userId}/messaging`);
        }else{
            alert('Enter correct userId and password.....!');
        }
    }
    return(
        <div className="outerdiv logindiv" >
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

