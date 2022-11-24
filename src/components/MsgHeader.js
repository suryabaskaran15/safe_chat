import React, { useContext, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { reciverContext } from "../screen/MainScreen";

const MsgHeader = () => {
  //   const reciverName = useContext(reciverContext);
  const { reciver } = useParams();
  const navigate = useNavigate();
  return (
    <div className="msgHeader">
      <IoMdArrowRoundBack
        size={40}
        id="back-btn"
        onClick={() => navigate(-1)}
      />
      <h2 id="msg-reciver">{reciver}</h2>
    </div>
  );
};

export default MsgHeader;
