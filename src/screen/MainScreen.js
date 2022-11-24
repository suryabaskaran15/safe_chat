import React, { createContext, useState } from "react";
import FriendsList from "../components/FriendsList";
import MessageBlock from "../components/MessageBlock";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/style.css";
import { useNavigate, useParams } from "react-router-dom";

export const reciverContext = createContext();
const MainScreen = () => {
  const navigate = useNavigate()
  const { userId } = useParams();
  const [val, setval] = useState("Welcome");
  const getVal = (name) => {
    setval(name);
    navigate(`/${userId}/messaging/${name}`);
  };
  return (
    <reciverContext.Provider value={val}>
      <div className="header">
        <center>SAFE CHAT</center>
      </div>
      <div className="maindiv">
        <div>
          <FriendsList get={getVal} />
        </div>
        <div>
          <MessageBlock />
        </div>
      </div>
    </reciverContext.Provider>
  );
};
export default MainScreen;
