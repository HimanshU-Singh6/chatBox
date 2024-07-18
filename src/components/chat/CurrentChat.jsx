import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
} from "@material-tailwind/react";
import { useMemo } from "react";
import { useSelector } from "react-redux";



const CurrentChat = () => {

  const chatUser = useSelector(state => state.chatUsers);
  
  const users = useMemo(() => {
    const uniqueUsers = new Set();
    chatUser.forEach((obj) => {
      if (obj.participants && obj.participants.length > 1) {
        const userObj = {
          username: obj.participants[1].username,
          avatarUrl: obj.participants[1].avatar.url
        };
        uniqueUsers.add(JSON.stringify(userObj));
      }
    });
    return Array.from(uniqueUsers).map(userStr => JSON.parse(userStr));
  }, [chatUser]);

  console.log('Unique Users:', users);

  return (
    <Card className="w-full m-4">
      <List>
        {users.map((obj)=>(
          <ListItem key={obj.username} className="hover:bg-secondary">
          <ListItemPrefix>
            <Avatar
              className="size-16 rounded-full mx-6"
              variant="circular"
              alt="candice"
              src={obj.avatarUrl}
            />
          </ListItemPrefix>
          <div>
            <Typography variant="h6" color="blue-gray">
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
