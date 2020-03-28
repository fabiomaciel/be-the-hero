const { celebrate, Segments, Joi } = require('celebrate');

function sessionValidator() {
  return celebrate({
    [Segments.BODY]: Joi.object({
      id: Joi.string().required()
    })
  })
}

module.exports = {
  sessionValidator
}