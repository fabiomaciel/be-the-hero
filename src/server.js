const app = require('./app');
const { envOrElse } = require('./utils/optionalUtils')
const PORT = envOrElse('PORT', 3333);

app.listen(PORT);