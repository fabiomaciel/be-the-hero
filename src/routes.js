const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const sessionValidator = require('./validators/sessionValidator');
const ongValidator = require('./validators/ongValidator');
const incidentValidator = require('./validators/incidentValidator');
const profileValidator = require('./validators/profileValidator');


const routes = express.Router()

routes.post('/session',
  sessionValidator.sessionValidator(),
  SessionController.create
);

routes.get('/ongs', OngController.list);

routes.post('/ongs',
  ongValidator.newOngValidator(),
  OngController.create
);

routes.get('/incidents',
  incidentValidator.getListValidator(),
  IncidentController.list
);

routes.post('/incidents',
  incidentValidator.newIncidentValidator(),
  IncidentController.create
);

routes.delete('/incidents/:id',
  incidentValidator.deleteIncidentValidator(),
  IncidentController.delete
);

routes.get('/profile',
  profileValidator.getProfileValidator(),
  ProfileController.list
);

module.exports = routes;