const { ulid } = require('ulid');

module.exports = function generateUniqueId() {
  return ulid();
}