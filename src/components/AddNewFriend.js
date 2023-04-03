import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebase_db";

const AddNewFriend = (props) => {
  const { userId } = useParams();
  const [show, setshow] = useState(props.display);
  const handle = (val) => {
    setshow(val);
    props.get(val);
  };
  const getDetails = async (frdName) => {
    let dbReport;
    const verify = await getDocs(
      query(collection(db, "user"), where("userName", "==", frdName))
    );
    verify.forEach((doc) => {
      dbReport = {
        friendName: doc.data().userName,
        friendUid: doc.data().uid,
      };
    });
    return dbReport;
  };
  const add_to_db = async (name) => {
    const userDetails = await getDetails(name);

    if (userDetails) {
      console.log(userDetails);
      await updateDoc(doc(db, "user", auth.currentUser.uid), {
        friendList: arrayUnion({
          name: userDetails.friendName,
          uid: userDetails.friendUid,
        }),
      });
      await updateDoc(doc(db, "user", userDetails.friendUid), {
        friendList: arrayUnion({
          name: auth.currentUser.displayName,
          uid: auth.currentUser.uid,
        }),
      });
      await setDoc(
        doc(
          db,
          "user",
          auth.currentUser.uid,
          "messages",
          userDetails.friendUid
        ),
        {}
      );
      await setDoc(
        doc(
          db,
          "user",
          userDetails.friendUid,
          "messages",
          auth.currentUser.uid
        ),
        {}
      );
      props.add();
    } else {
      alert("No frd found.pls enter correct id...!");
    }
  };
  return (
    <Modal show={show} onHide={() => handle(false)} size="sm">
      <ModalHeader closeButton className="text-center font-weight-bold  ">
        ADD NEW FRIEND
      </ModalHeader>
      <ModalBody>
        <input
          type={"text"}
          id="friendId"
          className="container rounded"
          autoFocus
        />
      </ModalBody>
      <ModalFooter className="text-center">
        <Button
          variant="primary"
          onClick={() => {
            add_to_db(document.getElementById("friendId").value);
            handle(false);
          }}
        >
          ADD
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddNewFriend;
