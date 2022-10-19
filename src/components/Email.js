import React from 'react';
import {MdEmail} from "react-icons/md";

const EmailId = ()=>{
    return(
        <div className="input-container">
            <MdEmail size={40} color='blue'/>
            <input id ='emailId' type={'email'} className="col-xs-15 border border-3 border-dark"/>
        </div>
    );
}

export default EmailId;