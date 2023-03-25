import React from "react";

const Messages = (props) => {
  return (
    <p className="msg" id="msg" msgId={props.key}>
      {props.msg}
    </p>
  );
};

export default Messages;
