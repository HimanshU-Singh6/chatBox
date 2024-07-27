import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedUserData } from "../../features/userSlice";


const CurrentChat = () => {
  const chatUser = useSelector((state) => state.chatUsers.currentChatUsers);
  const loggedInUser = useSelector((state) => state.auth.userData);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchUsers = useMemo(() => {
    if (!loggedInUser || !chatUser?.length) return [];

    let userName;
    try {
      userName = typeof loggedInUser === 'string' ? JSON.parse(loggedInUser).username : loggedInUser.username;
    } catch (error) {
      console.error("Invalid JSON string for loggedInUser", error);
      return [];
    }

    const uniqueUsers = new Set();

    chatUser.forEach((obj) => {
      if (obj?.participants?.length > 1) {
        obj.participants.forEach((participant) => {
          if (participant.username !== userName) {
            uniqueUsers.add(
              JSON.stringify({
                username: participant.username,
                avatarUrl: participant.avatar.url,
                userID: participant._id,
              })
            );
          }
        });
      }
    });

    return Array.from(uniqueUsers).map((userStr) => JSON.parse(userStr));
  }, [chatUser, loggedInUser]);

  useEffect(() => {
    const usersList = fetchUsers;
    if (usersList.length > 0) {
      setUsers(usersList);
      setLoading(false);
    }
  }, [fetchUsers]);

  const handleClick = (obj) => {
    if(obj){
      dispatch(addSelectedUserData(obj));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  
  return (
    <Card className="w-full m-4 bg-background">
      <List>
        {users.map((obj) => (
          <ListItem
            key={obj.username}
            onClick={() => handleClick(obj)}
            className="hover:bg-secondary"
          >
            <ListItemPrefix>
              <Avatar
                className="size-16 rounded-full mx-6"
                variant="circular"
                alt={obj.username}
                src={obj.avatarUrl}
              />
            </ListItemPrefix>
            <div>
              <Typography variant="h6">
                {obj.username}
              </Typography>
            </div>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default CurrentChat;
