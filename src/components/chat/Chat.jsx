import React from "react";
import { Button, Input, Msg , CurrentChat} from "../index";
import { logoutUser } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";

const Chat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await logoutUser();
      if (res.data.statusCode === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        dispatch(logout())
      } else {
        console.log("Failed to logout");
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      <div className="flex flex-wrap flex-row min-h-screen">
        <div className="bg-background border-r border-slate-500 border-opacity-25 w-1/3 max-h-screen box-border flex flex-wrap flex-col">
          <div className="bg-background h-[10%] flex flex-wrap items-center justify-center flex-row gap-5">
            <Button
              onClick={handleLogout}
              className={
                "bg-primary text-white p-3 rounded-md hover:bg-secondary min-w-20 capitalize"
              }
            >
              logout
            </Button>
            <Input
              placeholder={"search chat"}
              className={" capitalize text-center"}
            />
            <Button
              className={
                "bg-primary text-white p-3 rounded-md hover:bg-secondary min-w-20 capitalize"
              }
            >
              add chat
            </Button>
          </div>
          <div className="bg-background max-h-screen overflow-auto scroll-smooth h-[90%] box-border">
            <CurrentChat />
          </div>
        </div>
        <div className="bg-background w-2/3 flex flex-wrap flex-col">
          <div className="bg-background text-text h-[10%] border-opacity-25 border-b rounded-md border-slate-500">user info</div>
          <div className="bg-background   text-text h-[80%] ">chat modal</div>
          <div className="bg-background border-t border-opacity-25 rounded-md border-slate-500 text-text h-[10%] flex justify-start items-center "><Msg /></div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
