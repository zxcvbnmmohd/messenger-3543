const { Op } = require("sequelize");
const db = require("../db");

const UserConversation = db.define("user-onversation", {});

module.exports = UserConversation;