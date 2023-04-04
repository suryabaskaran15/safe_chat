import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import Confrim from "./Confrim.js";
const ContextMenu = (props) => {
  const [contextMenu, setContextMenu] = useState(null);
  const [confrimDetails, setConfrimDetails] = useState({});
  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null
    );
  };
  const handleClose = () => {
    setContextMenu(null);
  };
  console.log(props);
  return (
    <div onContextMenu={handleContextMenu} style={{ cursor: "context-menu" }}>
      {props.children}
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem
          onClick={() => {
            navigator.clipboard.writeText(props.children.props.msg);
            handleClose();
          }}
        >
          Copy
        </MenuItem>
        <MenuItem
          // hidden={true}
          onClick={() => {
            setConfrimDetails({
              show: true,
              option: "edit",
              msgId: props.children.key,
            });
            handleClose();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            setConfrimDetails({
              show: true,
              option: "delete",
              msgId: props.children.key,
            });
            handleClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
      {confrimDetails.show && (
        <Confrim
          show={confrimDetails.show}
          option={confrimDetails.option}
          msgId={confrimDetails.msgId}
          reciverUid={props.reciverUid}
          getShow={setConfrimDetails}
        />
      )}
    </div>
  );
};
export default ContextMenu;
