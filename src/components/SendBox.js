import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import React, { useState, useRef } from "react";
import { useContext } from "react";
import { MdSend } from "react-icons/md";
import { useParams } from "react-router-dom";
import { db } from "../firebase_db";
import { reciverContext } from "../screen/MainScreen";
const SendBox = (props) => {
  const { userId ,reciver} = useParams();
  const [msg, setmsg] = useState(false);
  const send = async () => {
    setmsg(!msg);
    const messages_Details = {
      msg: document.getElementById("sendbox").value,
      msgId: `${userId}.${reciver}.${Math.random()*2423}`,
      date: Date(),
      from: userId,
      to: reciver,
    };
    await updateDoc(doc(db, "user", userId, "messages", reciver), {
      messages: arrayUnion(messages_Details),
    });
    await updateDoc(doc(db, "user", reciver, "messages", userId), {
      messages: arrayUnion(messages_Details),
    });
    document.getElementById("sendbox").value = "";
    setTimeout(() => {
      props.get();
    }, 500);
  };

  let msg_Id = useRef(0);

  return (
    <div id="send-block">
      <textarea id="sendbox" />
      <MdSend size={40} id="sendbtn" onClick={() => send()} />
    </div>
  );
};

export default SendBox;
