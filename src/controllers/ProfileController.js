const incidentRepository = require('../infrastructure/repository/incidentRepository')
module.exports = {
    async list(req, res) {
        const ongId = req.headers.authorization;

        const incidents = await incidentRepository.findByOngId(ongId)

        return res.json(incidents);
    }
}