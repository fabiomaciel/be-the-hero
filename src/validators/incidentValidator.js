const { celebrate, Segments, Joi } = require('celebrate');

function getListValidator() {
  return celebrate({
    [Segments.QUERY]: Joi.object({
      page: Joi.number(),
      pageSize: Joi.number()
    }).unknown()
  })
}

function newIncidentValidator() {
  return celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  });
}

function deleteIncidentValidator() {
  return celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.number().required()
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  })
}

module.exports = {
  getListValidator,
  newIncidentValidator,
  deleteIncidentValidator
}