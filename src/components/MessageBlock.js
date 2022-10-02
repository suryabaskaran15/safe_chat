import React, { useState,useRef } from 'react';
import SendBox from './SendBox'
import MsgHeader from "./MsgHeader";
import '../style/messageblock.css';
import Messages from './Messages';
const MessageBlock = ()=>{
     let [messages,setmessages] = useState([]);
     let [flag,setflag]= useState();
    const getMessage = (data)=>{
        messages.push(data);
        setflag(!flag);
    }
    // debugger
    return(
        <div class='outerdiv messagediv'>
            <MsgHeader/>
            <div id='messages'>
                <ul>
                    {
                        messages.map((res)=>
                        <li className='msg' id={res.type} name={res.msgId}>
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