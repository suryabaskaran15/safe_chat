import React, {
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";
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
import { reciverContext } from "../screen/MainScreen";
import ContextMenu from "./ContextMenu";
const MessageBlock = (props) => {
  const { userId, reciver } = useParams();
  const scrollDown = useRef();
  // const reciverName = useContext(reciverContext);
  const [messages, setmessages] = useState([]);
  const [flag, setflag] = useState();
  const [reciverUid,setReciverUid] = useState(null);
  const getUserCredentials = async () => {
    let reciverUid;
    const reciverCredendials = await getDocs(
      query(collection(db, "user"), where("userName", "==", reciver))
    );
    reciverCredendials.forEach((doc) => {
      reciverUid = doc.data().uid;
    });
    setReciverUid(reciverUid);
    return reciverUid;
  };
  let reciver_Uid;
  const getMessage = async () => {
    reciver_Uid = await getUserCredentials();
    setmessages([]);
    const getMsg = onSnapshot(
      doc(db, "user", auth.currentUser.uid, "messages", reciver_Uid),
      (doc) => {
        setmessages(Object?.values(doc.data()));
      }
    );
    setflag(!flag);
    scrollDown.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    getUserCredentials();
    getMessage();
  }, [reciver]);
  return (
    <div className="outerdiv messagediv">
      <MsgHeader />
      <div id="messages">
        <ul>
          {messages?.map((res) => (
            <li
              className={res.from == userId ? "msg ourmsg" : "msg friendmsg"}
              key={res.msgId}
            >
              <ContextMenu reciverUid={reciverUid}>
                <Messages key={res.msgId} msg={res.msg} />
              </ContextMenu>
            </li>
          ))}
        </ul>
        <span ref={scrollDown}></span>
      </div>
      <SendBox get={getMessage} getUserDetails={getUserCredentials} />
    </div>
  );
};

export default MessageBlock;
