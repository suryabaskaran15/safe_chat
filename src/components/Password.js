import React from 'react';
import {IoIosLock} from "react-icons/io";

const Password = ()=>{
    return(
        <div className="input-container">
            <IoIosLock size={40} color='blue'/>
            <input id='password' type={"password"} className="col-xs-15 border border-3 border-dark"/> <br/>
        </div>
    );
}

export default Password;