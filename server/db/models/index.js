const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const UserConversation = require("./userConversation");

// associations

User.hasMany(Conversation);
Conversation.belongsTo(User, { as: "user1" });
Conversation.belongsTo(User, { as: "user2" });
Message.belongsTo(Conversation);
Conversation.hasMany(Message);

Conversation.belongsToMany(User, { through: UserConversation });
User.belongsToMany(Conversation, { through: UserConversation });

module.exports = {
  User,
  Conversation,
  Message,
  UserConversation,
};
