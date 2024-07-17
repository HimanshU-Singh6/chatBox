import React from "react";
import { Button, Input } from "../index";
import { logoutUser } from "../../api/api";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await logoutUser();
      if (res.data.statusCode === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
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
        <div className="bg-background border-r border-slate-500 w-1/3 flex flex-wrap flex-col">
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
          <div className="bg-background h-[90%]"></div>
        </div>
        <div className="bg-background w-2/3 flex flex-wrap flex-col">
          <div className="bg-background text-text h-[10%] border-b rounded-md border-slate-500">user info</div>
          <div className="bg-background   text-text h-[80%] ">chat modal</div>
          <div className="bg-background border-t rounded-md border-slate-500 text-text h-[10%] ">message</div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
