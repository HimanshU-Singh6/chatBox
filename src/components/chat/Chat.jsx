import React, { useEffect, useId, useRef, useState } from "react";
import { Button, Input, Msg, CurrentChat, Title, AddChat } from "../index";
import {
  logoutUser,
  getAllMessages as getAllMessagesApi,
  getChatId,
  sendChat,
} from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/authSlice";
import { deleteChatUser } from "../../features/userSlice";
import { useSocket } from "../../context/socketContext";

const Chat = () => {
  const MESSAGE_RECEIVED_EVENT = "messageReceived";
  const { socket } = useSocket();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.chatUsers.selectedUserData);
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [open, setOpen] = useState(false);
  const loggedInUser = useSelector((state) => state.auth.username);
  const userId = selectedUser?.userID;
  const messageEndRef = useRef(null);
  const id = useId();

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const messageSend = async (data) => {
    try {
      const res = await sendChat(chatId, data);
      if (res?.status === 200) {
        // Emit message for real-time updates
        socket.emit("sendMessage", { content: data, chatId });
        setMessage((prevMessages) => [
          ...prevMessages,
          { message: data, username: loggedInUser },
        ]);
        scrollToBottom();
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await logoutUser();
      if (res.data.statusCode === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("username");
        navigate("/login");
        dispatch(logout());
        dispatch(deleteChatUser());
      } else {
        console.log("Failed to logout");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [message]);

  useEffect(() => {
    setLoading(true);
    setMessage([]);
    (async () => {
      try {
        if (userId) {
          const chatIdObj = await getChatId(userId);
          if (chatIdObj?.status === 200) {
            const chatID = chatIdObj?.data?.data?._id;
            if (chatID) {
              setChatId(chatID);
              const res = await getAllMessagesApi(chatID);
              if (res?.status === 200) {
                const messageArray = res?.data?.data;
                setMessage(messageArray.map((message) => ({
                  message: message.content,
                  username: message.sender.username,
                })));
                scrollToBottom();
              }
            }
          }
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [selectedUser, userId]);

  const onMessageReceived = (newMessage) => {
    setMessage((prevMessages) => [
      ...prevMessages,
      {
        message: newMessage.content,
        username: newMessage.sender.username,
      },
    ]);
    scrollToBottom();
  };

  useEffect(() => {
    if (!socket) return;

    socket.on(MESSAGE_RECEIVED_EVENT, onMessageReceived);

    return () => {
      socket.off(MESSAGE_RECEIVED_EVENT, onMessageReceived);
    };
  }, [socket]);

  return (
    <div>
      <div className="flex flex-wrap flex-row min-h-screen">
        <div className="bg-background border-r border-slate-500 border-opacity-25 w-1/3 max-h-screen box-border flex flex-wrap flex-col">
          <div className="bg-background h-[10%] flex flex-wrap items-center justify-center flex-row gap-5">
            <Button
              onClick={handleLogout}
              className="bg-primary text-white p-3 rounded-md hover:bg-secondary min-w-20 capitalize"
            >
              logout
            </Button>
            <Input
              placeholder="search chat"
              className="capitalize text-center"
            />
            <Button
              className="bg-primary text-white p-3 rounded-md hover:bg-secondary min-w-20 capitalize"
              onClick={handleOpen}
            >
              add chat
            </Button>
            <AddChat open={open} handleClose={handleClose} />
          </div>
          <div className="bg-background max-h-screen overflow-auto scroll-smooth h-[90%] box-border">
            <CurrentChat />
          </div>
        </div>
        <div className="bg-background w-2/3 max-h-screen flex flex-wrap flex-col">
          <div className="bg-background text-text h-[10%] border-opacity-25 items-center flex border-b rounded-md border-slate-500">
            {selectedUser && (
              <>
                <div className="ml-8">
                  <img
                    className="size-16 rounded-full"
                    src={selectedUser?.avatarUrl}
                    alt=""
                  />
                </div>
                <Title username={selectedUser?.username} />
              </>
            )}
          </div>
          <div className="bg-background h-[80%]" style={{ maxHeight: "calc(100vh - 20%)" }}>
            {loading ? (
              <div>loading</div>
            ) : (
              <div className="h-screen flex flex-col max-h-full">
                <div className="bg-background flex-1 overflow-y-scroll scroll-smooth max-h-full">
                  <div className="px-4 py-2">
                    {message.map((obj, index) =>
                      loggedInUser === obj.username ? (
                        <div
                          key={`${id}-${index}`}
                          className="flex items-center justify-end"
                        >
                          <div className="bg-primary text-white rounded-lg p-4 rounded-br-none m-2 shadow mr-2 max-w-sm">
                            {obj.message}
                          </div>
                        </div>
                      ) : (
                        <div
                          key={`${id}-${index}`}
                          className="flex items-center justify-start"
                        >
                          <div className="bg-secondary rounded-lg p-4 rounded-bl-none shadow m-2 max-w-sm">
                            {obj.message}
                          </div>
                        </div>
                      )
                    )}
                    <div ref={messageEndRef} />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="bg-background border-t border-opacity-25 rounded-md border-slate-500 text-text h-[10%] flex justify-start items-center ">
            <Msg onFormSubmit={messageSend} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;