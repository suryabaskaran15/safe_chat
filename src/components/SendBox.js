import {  doc, Timestamp, updateDoc } from "firebase/firestore";
import React, { useState, useRef } from "react";
import { useContext } from "react";
import { MdSend } from "react-icons/md";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebase_db";
import { reciverContext } from "../screen/MainScreen";
const SendBox = (props) => {
  const { userId, reciver } = useParams();
  const [msg, setmsg] = useState(false);
  const send = async () => {
    const reciverUid = await props.getUserDetails();
    setmsg(!msg);
    console.log(auth.currentUser.uid);
    console.log(reciverUid);
    const messages_Details = {
      msg: document.getElementById("sendbox").value,
      msgId: `${userId}${reciver}${Math.round(Math.random() * 2423)}`,
      date: Timestamp.now().toDate(),
      from: userId,
      to: reciver,
    };
    await updateDoc(
      doc(db, "user", auth.currentUser.uid, "messages", reciverUid),
      {
        [messages_Details.msgId]: messages_Details,
      }
    );
    await updateDoc(
      doc(db, "user", reciverUid, "messages", auth.currentUser.uid),
      {
        [messages_Details.msgId]: messages_Details,
      }
    );
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
