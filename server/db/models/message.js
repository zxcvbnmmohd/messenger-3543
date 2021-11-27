const Sequelize = require("sequelize");
const db = require("../db");

const Message = db.define("message", {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  senderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  didRead: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
});

Message.markMessagesAsRead = async (convoId, senderId) => {
  return await Message.update(
    { 
      didRead: true, 
    },
    {
      where: {
        conversationId: convoId,
        senderId: senderId,
        didRead: false,
      },
    },
  );
};

module.exports = Message;
