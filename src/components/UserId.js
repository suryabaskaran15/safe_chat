import React from "react";
import { FaUserAlt } from "react-icons/fa";

const UserId = () => {
  return (
    <div className="input-container">
      <FaUserAlt size={33} color="#4831D4" />
      <input
        id="userId"
        name="userId"
        type={"text"}
        className="border-bottom border-dark textboxTheme"
      />
    </div>
  );
};

export default UserId;
