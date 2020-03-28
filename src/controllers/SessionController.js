const ongRepository = require('../infrastructure/repository/ongRepository')

module.exports = {
    async create(req, res) {
        const { id } = req.body;

        const ong = await ongRepository.find(id);

        if (!ong) {
            return res.status(400).json({ error: 'No ONG found with given id' });
        }

        return res.json(ong)
    }
}