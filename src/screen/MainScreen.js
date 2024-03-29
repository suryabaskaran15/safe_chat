import React, { createContext, useState } from "react";
import FriendsList from "../components/FriendsList";
import MessageBlock from "../components/MessageBlock";
import Header from "../components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/style.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { auth } from "../firebase_db";

export const userContext = createContext();
const MainScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [val, setval] = useState("Welcome");
  const getVal = (frdDetails) => {
    setval(frdDetails);
    navigate(`/${auth.currentUser.displayName}/messaging/${frdDetails.name}`);
  };

  console.log("current user", auth.currentUser);
  return (
    <userContext.Provider value={val}>
      <Header />
      <div className="maindiv">
        <FriendsList get={getVal} />
        <MessageBlock />
      </div>
    </userContext.Provider>
  );
};
export default MainScreen;

// "https://firebasestorage.googleapis.com/v0/b/safe-chat-a20bb.…filePic?alt=media&token=44fce3e0-3890-4d13-b452-690560a32d91"
// "https://firebasestorage.googleapis.com/v0/b/safe-chat-a20bb.appspot.com/o/OXc6YiZct3Pp4T3tPVst9P5D40l1%2FprofilePic%2FprofilePic.png?alt=media&token=a615fcff-34ff-4863-b16b-1fb65ff2a3f2"
