const { celebrate, Segments, Joi } = require('celebrate');

function getProfileValidator() {
  return celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  })
}

module.exports = {
  getProfileValidator
}