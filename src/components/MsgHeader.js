import React, {useContext, useState } from 'react';
import {IoMdArrowRoundBack} from 'react-icons/io';
import {reciverContext } from '../screen/MainScreen';

const MsgHeader = ()=>{
    const reciverName = useContext(reciverContext);
    
    return(
        <div className='msgHeader'>
            <IoMdArrowRoundBack size={40}/>
            <label id='msg-reciver'>{reciverName}</label>
        </div>
    );
}

export default MsgHeader;