import React from 'react';
import { FaUserAlt } from "react-icons/fa";

const UserId = ()=>{
    return(
        <div class="input-container">
            <FaUserAlt size={33} color='blue'/>
            <input id='userId' type={'text'} class="col-xs-15 border border-3 border-dark"/>
        </div>
    );
}

export default UserId;