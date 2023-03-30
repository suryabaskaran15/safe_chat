import { Input } from "@mui/material";
import {
  deleteField,
  doc,
  getDoc,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebase_db";

const Confrim = (props) => {
  const { userId } = useParams();
  const [details, setDetails] = useState(props);
  const [msgDetails, setMsgDetails] = useState();
  const [alteredMsg, setAlteredMsg] = useState();
  const getMsgFromDb = async () => {
    const msg = await (
      await getDoc(
        doc(db, "user", auth.currentUser.uid, "messages", details.reciverUid)
      )
    ).data();
    setMsgDetails(msg[details.msgId]);
    setAlteredMsg(msg[details.msgId].msg);
    console.log(msg);
  };
  // please check no edit option for friend's message  ****
  const editMsg = async () => {
    await updateDoc(
      doc(db, "user", auth.currentUser.uid, "messages", details.reciverUid),
      {
        [details.msgId]: {
          date: msgDetails.date,
          from: msgDetails.from,
          msg: alteredMsg,
          msgId: details.msgId,
          to: msgDetails.to,
        },
      }
    );
    await updateDoc(
      doc(db, "user", details.reciverUid, "messages", auth.currentUser.uid),
      {
        [details.msgId]: {
          date: msgDetails.date,
          from: msgDetails.from,
          msg: alteredMsg,
          msgId: details.msgId,
          to: msgDetails.to,
        },
      }
    );
  };
  const deleteMsg = async (delOption = null) => {
    await updateDoc(
      doc(db, "user", auth.currentUser.uid, "messages", details.reciverUid),
      {
        [details.msgId]: deleteField(),
      }
    );
    if (delOption === "both") {
      await updateDoc(
        doc(db, "user", details.reciverUid, "messages", auth.currentUser.uid),
        {
          [details.msgId]: deleteField(),
        }
      );
    }
  };
  useEffect(() => {
    getMsgFromDb();
  }, []);
  return (
    <Modal show={details.show}>
      <ModalHeader className="text-center font-weight-bold">
        {details.option === "edit" ? "Edit" : "Delete"}
      </ModalHeader>
      <ModalBody>
        {details.option === "edit" ? (
          <form>
            <Input
              type="text"
              id="editedMsg"
              value={alteredMsg}
              onChange={(e) => {
                setAlteredMsg(e.target.value);
              }}
            />
          </form>
        ) : (
          "Delete"
        )}
      </ModalBody>
      <ModalFooter>
        <Button
          color="red"
          onClick={() => {
            setDetails({ show: false });
            props.getShow({ show: false });
          }}
        >
          Cancel
        </Button>
        {details.option === "delete" && msgDetails.from === userId ? (
          <Button
            onClick={() => {
              deleteMsg("both");
              setDetails({ show: false });
              props.getShow({ show: false });
            }}
          >
            Delete from Every One
          </Button>
        ) : null}
        <Button
          onClick={
            details.option === "edit"
              ? () => {
                  editMsg();
                  setDetails({ show: false });
                  props.getShow({ show: false });
                }
              : () => {
                  deleteMsg();
                  setDetails({ show: false });
                  props.getShow({ show: false });
                }
          }
        >
          {details.option === "edit" ? "Edit" : "Delete From Me"}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
export default Confrim;
