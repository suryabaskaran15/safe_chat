import React,{useEffect, useState, useRef} from 'react';
import { useContext } from 'react';
import {MdSend} from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { reciverContext } from '../screen/MainScreen';
const SendBox = (props)=>{
    const reciverName = useContext(reciverContext);
    const {userId} = useParams();
    const [msg,setmsg] = useState({});
    const send = ()=>{
    setmsg({
        msg:document.getElementById('sendbox').value,
        msgId:msg_Id.current+1,
        date:Date(),
        from:userId,
        to: reciverName
    });
    document.getElementById('sendbox').value = ""
    console.log(msg);
    }
    let msg_Id = useRef(0);
    useEffect(()=>{
        if(msg) {
            props.get(msg);
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