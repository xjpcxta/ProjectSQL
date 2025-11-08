const pool = require('../config/db');
const { getDb } = require('../config/mongo');

exports.buscarTodosHerois = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT
                h.id AS id_heroi,
                h.nome_heroi,
                h.identidade_secreta,
                (
                    SELECT g.nome_grupo
                    FROM grupos g
                    JOIN heroi_grupos hg ON g.id = hg.id_grupo
                    WHERE hg.id_heroi = h.id
                    LIMIT 1
                ) AS organizacao
            FROM herois h
        `);
        
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao buscar heróis:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

exports.buscarHeroiPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await pool.query(`
            SELECT
                h.id AS id_heroi,
                h.nome_heroi,
                h.identidade_secreta,
                h.principal_vilao, -- Conforme solicitado
                (
                    SELECT g.nome_grupo
                    FROM grupos g
                    JOIN heroi_grupos hg ON g.id = hg.id_grupo
                    WHERE hg.id_heroi = h.id
                    LIMIT 1
                ) AS organizacao
            FROM herois h
            WHERE h.id = ?
        `, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Herói não encontrado.' });
        }

        const heroiSql = rows[0];

        const db = getDb();
        if (!db) {
            return res.status(500).json({ message: 'Conexão com MongoDB perdida.' });
        }

        const perfilMongo = await db.collection('perfis_extendidos')
                                    .findOne({ id_heroi_mysql: parseInt(id) });

        const perfilCompleto = {
            // Dados do MySQL
            id_heroi: heroiSql.id_heroi,
            nome_heroi: heroiSql.nome_heroi,
            identidade_secreta: heroiSql.identidade_secreta,
            principal_vilao: heroiSql.principal_vilao,
            organizacao: heroiSql.organizacao,
            
            // Dados do MongoDB
            poderes: perfilMongo ? perfilMongo.poderes : 'Não especificado',
            referencias: perfilMongo ? perfilMongo.referencias : 'Não especificado',
            outros_viloes: perfilMongo ? perfilMongo.outros_viloes : 'Não especificado',
            feito_notavel: perfilMongo ? perfilMongo.feito_notavel : 'Não especificado',
            trajes: perfilMongo ? perfilMongo.trajes : 'Não especificado',
            
            imagem_url: `/image/${id}.jpeg`
        };
        
        res.status(200).json(perfilCompleto);

    } catch (error) {
        console.error('Erro ao buscar herói por ID:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

exports.atualizarHeroi = async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            // Campos do MySQL
            nome_heroi, identidade_secreta, principal_vilao, organizacao,
            // Campos do MongoDB
            poderes, referencias, outros_viloes, trajes, feito_notavel
        } = req.body;

        if (nome_heroi || identidade_secreta || principal_vilao) {
            await pool.query(
                'UPDATE herois SET nome_heroi = ?, identidade_secreta = ?, principal_vilao = ? WHERE id = ?',
                [nome_heroi, identidade_secreta, principal_vilao, id]
            );
        }

        if (organizacao) {
            const [grupoRows] = await pool.query('SELECT id FROM grupos WHERE nome_grupo = ?', [organizacao]);
            if (grupoRows.length > 0) {
                const id_grupo = grupoRows[0].id;
                await pool.query(
                    'INSERT INTO heroi_grupos (id_heroi, id_grupo) VALUES (?, ?) ON DUPLICATE KEY UPDATE id_grupo = ?',
                    [id, id_grupo, id_grupo]
                );
            }
        }

        const db = getDb();
        if (!db) {
            return res.status(500).json({ message: 'Conexão com MongoDB perdida.' });
        }
        
        const collection = db.collection('perfis_extendidos');
        const updateData = {};
        
        if (poderes) updateData.poderes = poderes;
        if (referencias) updateData.referencias = referencias;
        if (outros_viloes) updateData.outros_viloes = outros_viloes;
        if (trajes) updateData.trajes = trajes;
        if (feito_notavel) updateData.feito_notavel = feito_notavel;

        if (Object.keys(updateData).length > 0) {
            await collection.updateOne(
                { id_heroi_mysql: parseInt(id) },
                { $set: updateData },
                { upsert: true }
            );
        }

        res.status(200).json({ message: 'Herói atualizado com sucesso!' });

    } catch (error) {
        console.error('Erro ao atualizar herói:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};