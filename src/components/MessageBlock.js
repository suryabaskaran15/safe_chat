import React, { useState,useRef } from 'react';
import SendBox from './SendBox'
import MsgHeader from "./MsgHeader";
import '../style/messageblock.css';
import Messages from './Messages';
const MessageBlock = (props)=>{
     let [messages,setmessages] = useState([]);
     let [flag,setflag]= useState();
    const getMessage = (data)=>{
        messages.push(data);
        setflag(!flag);
    }
    return(
        <div className='outerdiv messagediv'>
            <MsgHeader/>
            <div id='messages'>
                <ul>
                    {
                        messages.map((res)=>
                        <li className='msg' id={res.type} key={res.msgId}>
                            <Messages msg={res.msg}/>
                        </li>)
                    }
                </ul>
            </div>
            <SendBox get={getMessage}/>
        </div>
    );
}

export default MessageBlock;