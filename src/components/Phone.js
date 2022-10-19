import React from 'react';
import{HiPhone} from "react-icons/hi";

const PhoneNumber = ()=>{
    return(
        <div>
            <HiPhone size={35} color='blue'/>
            <input id ='phoneNmber' type={'tel'} className="col-xs-15 border border-3 border-dark"/>
        </div>
    );
}

export default PhoneNumber;