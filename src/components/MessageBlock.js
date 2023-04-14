import React, { useState, useEffect, useContext, useRef } from "react";
import SendBox from "./SendBox";
import MsgHeader from "./MsgHeader";
import Messages from "./Messages";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase_db";
import { useParams } from "react-router-dom";
import { reciverContext, userContext } from "../screen/MainScreen";
import ContextMenu from "./ContextMenu";
import { getUserDetails } from "../util/function_Module";
const MessageBlock = (props) => {
  const { userId, reciver } = useParams();
  const scrollDown = useRef();
  const reciverDetails = useContext(userContext);
  const [messages, setmessages] = useState([]);
  const [flag, setflag] = useState();
  const [reciverUid, setReciverUid] = useState(null);
  
  const getMessage = async () => {
    // const reciver_Uid = await getUserDetails(reciver);
    // console.log(reciver_Uid)
    // setReciverUid(reciver_Uid.uid);
    setmessages([]);
    const getMsg = onSnapshot(
      doc(db, "user", auth.currentUser.uid, "messages", reciverDetails.uid),
      (doc) => {
        const sortedMessages = Object?.values(doc.data()).sort((date1,date2)=> date1.time - date2.time);
        console.log("sortedMessages",sortedMessages);
        setmessages(sortedMessages);
      }
    );
    setflag(!flag);
    scrollDown.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    getMessage();
  }, [reciverDetails.uid]);
  return (
    <div className="outerdiv messagediv">
      <MsgHeader />
      <div id="messages">
        <ul>
          {messages?.map((res) => (
            <li
              className={res.from == auth.currentUser.uid ? "msg ourmsg" : "msg friendmsg"}
              key={res.msgId}
            >
              <ContextMenu reciverUid={reciverDetails.uid} from={res.from}>
                <Messages key={res.msgId} msg={res.msg} />
              </ContextMenu>
            </li>
          ))}
        </ul>
        <span ref={scrollDown}></span>
      </div>
      <SendBox get={getMessage}  />
    </div>
  );
};

export default MessageBlock;
