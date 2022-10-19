import React from 'react';
import { FaUserAlt } from "react-icons/fa";

const UserId = ()=>{
    return(
        <div className="input-container">
            <FaUserAlt size={33} color='blue'/>
            <input id='userId' type={'text'} className="border-bottom border-dark"/>
        </div>
    );
}

export default UserId;