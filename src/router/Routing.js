import { Routes, Route } from "react-router-dom";
import Login from "../screen/Login";
import CreateNewUser from "../screen/CreateNewUser";
import ForgotPassword from "../screen/ForgotPassword";
import MainScreen from "../screen/MainScreen";
import ResetPassword from "../screen/ResetPassword";
import UploadProfilePic from "../screen/UploadProfilePic";
import Setting from "../screen/Setting";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Create" element={<CreateNewUser />} />
      <Route path="/uploadPic/" element={<UploadProfilePic />} />
      <Route path="/ForgotPassword/" element={<ForgotPassword />} />
      <Route
        path="/ForgotPassword/ResetPassword/"
        element={<ResetPassword />}
      />
      <Route path="/:userId/messaging/:reciver" element={<MainScreen />} />
      <Route path="/:userId/setting" element={<Setting/>}/>
    </Routes>
  );
};

export default Routing;
