import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsFillPersonPlusFill, BsThreeDotsVertical } from "react-icons/bs";
import AddNewFriend from "./AddNewFriend";
import { auth, db } from "../firebase_db";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import man from "../assets/man.png";
import { Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { async } from "@firebase/util";
const FriendsList = (props) => {
  const userCredentials = auth.currentUser;
  const userId = userCredentials.displayName;
  const dp = userCredentials.photoURL;
  const navigate = useNavigate();
  const [show, setshow] = useState();
  const [friendList, setfriendList] = useState([]);
  const [flag, setflag] = useState(false);
  const [anchorPosition, setAnchorPosition] = useState(null);
  const [images, setImages] = useState([]);
  const handle = (value) => {
    setshow(value);
  };
  const added = () => {
    setflag(!flag);
  };

  const getFriendsList = onSnapshot(
    doc(db, "user", userCredentials.uid),
    (doc) => {
      let data = doc.data().friendList;
      let imageList = [];
      data.map(async (res) => {
        await getDocs(
          query(collection(db, "user"), where("userName", "==", res))
        ).then((user) => {
          user.forEach((res) => {
            console.log("res", res.data());
            imageList.push({
              userName: res.data().userName,
              url: res.data().photoURL,
            });
          });
        });
      });
      console.log("image", imageList);
    }
  );

  useEffect(() => {
    getFriendsList();
  }, []); //flag in array
  return (
    <div className="outerdiv friendList row ">
      <h2 id="ourId" className="col-12 container text-center">
        <img src={dp} className="friendImg" />
        {userId}
        <BsThreeDotsVertical
          className="menu-main"
          onClick={(e) =>
            setAnchorPosition(
              anchorPosition === null
                ? {
                    mouseX: e.clientX + 2,
                    mouseY: e.clientY - 6,
                  }
                : null
            )
          }
        />
      </h2>
      <ul>
        {friendList?.map((res) => {
          console.log("resp", res);
          return (
            <div className="friend">
              <img src={res.url} alt="" className="friendImg" />
              <li
                className="col-12 friendId"
                key={res.userName}
                onClick={() => props.get(res.userName)}
              >
                {res.userName}
              </li>
            </div>
          );
        })}
      </ul>
      <BsFillPersonPlusFill
        onClick={() => handle(true)}
        size={30}
        className="col-12"
      />
      {show && <AddNewFriend display={show} get={handle} add={added} />}
      {anchorPosition !== null && (
        <Menu
          open={anchorPosition !== null}
          anchorReference="anchorPosition"
          anchorPosition={
            anchorPosition !== null
              ? { top: anchorPosition.mouseY, left: anchorPosition.mouseX }
              : undefined
          }
        >
          <MenuItem
            onClick={() => {
              navigate(`/${auth.currentUser.displayName}/setting`);
              setAnchorPosition(null);
            }}
          >
            setting
          </MenuItem>
        </Menu>
      )}
    </div>
  );
};

export default FriendsList;
