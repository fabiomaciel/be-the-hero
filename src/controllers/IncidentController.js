const incidentRepository = require('../infrastructure/repository/incidentRepository');

module.exports = {

    async list(req, res) {
        const { query: { page = 1, pageSize = 5 } } = req;

        const count = await incidentRepository.count();
        const incidents = await incidentRepository.findPage(page, pageSize);

        res.header('Total-Count', count);
        return res.json(incidents);
    },

    async create(req, res) {
        const { title, description, value } = req.body;

        const ongId = req.headers.authorization;

        const id = await incidentRepository.save({
            title,
            description,
            value,
            ongId
        });

        return res.json({ id })
    },

    async delete(req, res) {
        const { id } = req.params;
        const ong_id = req.headers.authorization;

        const incident = await incidentRepository.find(id);

        if (!incident || incident.ong_id != ong_id) {
            return res.status(401).json({ error: 'Operation not permitted' });
        }

        await incidentRepository.remove(id);

        return res.status(204).send();

    }
}