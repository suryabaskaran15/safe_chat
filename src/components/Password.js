import React from 'react';
import {IoIosLock} from "react-icons/io";

const Password = ()=>{
    return(
        <div className="input-container">
            <IoIosLock size={40} color="#4831D4"/>
            <input id='password' className='textboxTheme' type={"password"}/> <br/>
        </div>
    );
}

export default Password;