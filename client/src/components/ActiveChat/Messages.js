import React, { useState }from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const [showReadAvatar, setShowReadAvatar] = useState({
    show: false,
    messageId: null,
  });
  
  const checkLastMessageRead = (message) => {
    const { show } = showReadAvatar;
    console.log("hihihihihihihihihihihihihihihihihihihi")
    if (!show && message.didRead && message.senderId === userId) {
      setShowReadAvatar({ show: true, messageId: message.id });
    }
  };

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");
        checkLastMessageRead(message)
        
        return message.senderId === userId ? (
          <SenderBubble
            key={message.id}
            text={message.text}
            time={time}
            showAvatar={showReadAvatar.messageId === message.id}
            otherUser={otherUser}
          />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
    </Box>
  );
};

export default Messages;
