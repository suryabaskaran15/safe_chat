import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsFillPersonPlusFill, BsThreeDotsVertical } from "react-icons/bs";
import AddNewFriend from "./AddNewFriend";
import { auth, db, storage } from "../firebase_db";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref } from "firebase/storage";
const FriendsList = (props) => {
  const userCredentials = auth.currentUser;
  const userId = userCredentials.displayName;
  const dp = userCredentials.photoURL;
  const navigate = useNavigate();
  const [show, setshow] = useState();
  const [friends, setFriends] = useState([]);
  const [flag, setflag] = useState(false);
  const [anchorPosition, setAnchorPosition] = useState(null);
  const handle = (value) => {
    setshow(value);
  };
  const added = () => {
    setflag(!flag);
  };
  const getFriendsList = async () => {
    const friendsList = await onSnapshot(
      doc(db, "user", userCredentials.uid),
      async (doc) => {
        const friendsData = doc.data().friendList;

        let friendWithImage = [];
        friendsData.map(async (data) => {
          console.log(data);
          getDownloadURL(
            ref(storage, `${data.uid}/profilePic/profilePic`)
          ).then((url) => {
            console.log("url", url);
            friendWithImage.push({
              uid: data.uid,
              name: data.name,
              url: url,
            });
          });
        });
        setFriends(friendWithImage);
        console.log("friendWithImage", friendWithImage);
      }
    );
  };

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
        {friends?.map((res) => {
          return (
            <div className="friend">
              {console.log("friendList", friends)}
              <img src={res.url} alt="" className="friendImg" />
              <li
                className="col-12 friendId"
                key={res.name}
                onClick={() => props.get(res.name)}
              >
                {res.name}
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
