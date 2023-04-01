import React, { useContext, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { userContext } from "../screen/MainScreen";

const MsgHeader = () => {
  const reciverName = useContext(userContext);
  const { reciver } = useParams();
  const navigate = useNavigate();
  return (
    <div className="msgHeader">
      <IoMdArrowRoundBack
        size={40}
        id="back-btn"
        onClick={() => navigate(-1)}
      />
      <div className="imageAndName">
        <img src={reciverName.url} className="friendImg" />
        <h2 id="">{reciverName.name}</h2>
      </div>
    </div>
  );
};

export default MsgHeader;
