const ongRepository = require('../infrastructure/repository/ongRepository')

module.exports = {
    async list(req, res) {
        const ongs = await ongRepository.findAll()
        return res.json(ongs);
    },
    async create(req, res) {
        const { name, email, whatsapp, city, uf } = req.body;
        const id = await ongRepository.save({ name, email, whatsapp, city, uf })
        return res.json({ id })
    }
}