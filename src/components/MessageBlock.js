import React, { useState, useEffect, useContext, useRef, useCallback } from "react";
import SendBox from "./SendBox";
import MsgHeader from "./MsgHeader";
import Messages from "./Messages";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase_db";
import { useParams } from "react-router-dom";
import { reciverContext } from "../screen/MainScreen";
import ContextMenu from "./ContextMenu";
const MessageBlock = (props) => {
  const { userId, reciver } = useParams();
  const scrollDown = useRef();
  // const reciverName = useContext(reciverContext);
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  let [messages, setmessages] = useState([]);
  let [flag, setflag] = useState();
  const [menuShow,setmenuShow]=useState(false);
  const getMessage = async () => {
    setmessages([]);
    const getMsg = onSnapshot(
      doc(db, "user", userId, "messages", reciver),
      (doc) => {
        setmessages(doc.data().messages);
      }
    );
    setflag(!flag);
    scrollDown.current.scrollIntoView({ behavior: "smooth" });
  };
  const handleClick = useCallback(() => (menuShow ? setmenuShow(false) : null), [menuShow]);

  useEffect(() => {
    document.addEventListener('click',handleClick);
    getMessage();
  }, [reciver]);
  return (
    <div className="outerdiv messagediv">
      <MsgHeader />
      <div id="messages">
        <ul>
          {messages.map((res) => (
            <li
              className={res.from == userId ? "msg ourmsg" : "msg friendmsg"}
              key={res.msgId} onClick={(e)=>{
                setAnchorPoint({x:e.pageX,y:e.pageY})
                setmenuShow(true);
              }}
            >
              <Messages msg={res.msg} />
            </li>
          ))}
        
        <span ref={scrollDown}></span>
        </ul>
      </div>
      <SendBox get={getMessage} />
      {menuShow ?
          <ContextMenu show = {menuShow} points={anchorPoint}/>
          : <></>
      }  
    </div>
  );
};

export default MessageBlock;
