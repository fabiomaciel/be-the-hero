
exports.envOrElse = (key, elseValue) =>
  (process.env[key] || elseValue);
