import React,{useEffect, useState, useRef} from 'react';
import {MdSend} from 'react-icons/md';
const SendBox = (props)=>{
    const [msg,setmsg] = useState();
    const send = ()=>{
    setmsg(document.getElementById('sendbox').value);
    document.getElementById('sendbox').value = ""
    }
    let msg_Id = useRef(0);
    useEffect(()=>{
        if(msg) {
            props.get({
                msg:msg,
                type:'ourmsg',
                msgId:msg_Id.current+=1
            })
        }
    },[msg])
    return(
        <div id='send-block'>
            <textarea  id='sendbox'/>
            <MdSend size={40} id='sendbtn' onClick={()=>send()}/>
        </div>
    );
}

export default SendBox;