const authenticate = require("./auth.middleware");
const checkModerator = require("./moderator.middleware");

module.exports = {
  authenticate,
  checkModerator,
};
