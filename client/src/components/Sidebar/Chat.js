import React from "react";
import { Box, Chip } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { setChatAsRead } from "../../store/utils/thunkCreators";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab"
    }
  }
}));

const Chat = (props) => {
  const classes = useStyles();
  const { conversation } = props;
  const { otherUser, unreadCount } = conversation;
    
  const handleClick = async (conversation) => {
    await props.setActiveChat(conversation.otherUser.username);
    if (unreadCount > 0) {
      await props.setChatAsRead(conversation.id, conversation.otherUser.id);
    }
  };
  
  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={conversation} />
      {unreadCount > 0 && (<Chip color="primary" size="small" label={unreadCount} />)}
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    setChatAsRead: (convoId, senderId) => {
      dispatch(setChatAsRead({ convoId: convoId, senderId: senderId }));
    },
  };
};

export default connect(null, mapDispatchToProps)(Chat);
