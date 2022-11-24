import { useCallback, useEffect, useState } from "react";

const ContextMenu = (props)=>{
  const [show,setshow] = useState(props.show);
  const [anchorPoint,setAnchorPoint] = useState(props.points);

  return (
    <div className="menuDiv">
      {show ? (
        <ul
          className="menu"
          style={{
            top: anchorPoint.y,
            left: anchorPoint.x
          }}
        >
          <li>Copy</li>
          <li>Edit</li>
          <li>Delete</li>
        </ul>
      ) : (
        <> </>
      )}
    </div>
  );
}
export default ContextMenu;