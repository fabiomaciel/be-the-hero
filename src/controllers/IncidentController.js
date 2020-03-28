const { connection } = require('../database/connection');

module.exports = {

    async list(req, res) {
        const { query: { page = 1, pageSize = 5 } } = req;

        const [count] = await connection('incidents').count()

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(pageSize)
            .offset((page - 1) * pageSize)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        res.header('Total-Count', count['count(*)'])
        return res.json(incidents)
    },

    async create(req, res) {
        const { title, description, value } = req.body;

        const ong_id = req.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return res.json({ id })
    },

    async delete(req, res) {
        const { id } = req.params;
        const ong_id = req.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (!incident || incident.ong_id != ong_id) {
            return res.status(401).json({ error: 'Operation not permitted' });
        }

        await connection('incidents').where('id', id).delete();

        return res.status(204).send();

    }
}