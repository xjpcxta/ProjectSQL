const pool = require('../config/db');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

function hashSenha(senha) {
    return crypto.createHash('sha256').update(senha).digest('hex');
}

exports.login = async (req, res) => {
    try {
        const { username, senha } = req.body;
        
        console.log(`[DEBUG] Tentativa de login recebida para usuário: ${username}`);

        if (!username || !senha) {
            return res.status(400).json({ message: 'Usuário e senha são obrigatórios.' });
        }
        
        const senhaHasheada = hashSenha(senha);
        
        console.log(`[DEBUG] Hash gerado pela API: ${senhaHasheada}`);

        const [rows] = await pool.query(
            'SELECT u.id, u.login, g.nome_grupo FROM usuarios u JOIN grupos_usuarios g ON u.id_grupo = g.id WHERE u.login = ? AND u.senha_hash = ?',
            [username, senhaHasheada]
        );
        
        console.log(`[DEBUG] Linhas encontradas pela query: ${rows.length}`);

        if (rows.length === 0) {
            console.warn('[DEBUG] Query não retornou linhas. Verifique se o hash acima bate com o do DB.');
            return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
        }

        const usuario = rows[0];

        const payload = {
            id: usuario.id,
            login: usuario.login,
            grupo: usuario.nome_grupo 
        };

        const token = jwt.sign(payload, JWT_SECRET, {
            expiresIn: '8h'
        });
        
        console.log(`[DEBUG] Login bem-sucedido para: ${usuario.login} (Grupo: ${usuario.grupo})`);

        res.status(200).json({
            message: 'Login bem-sucedido!',
            token: token,
            usuario: {
                id_usuario: usuario.id,
                username: usuario.login,
                grupo: usuario.nome_grupo
            }
        });

    } catch (error) {
        console.error('Erro no login:', error);
        if (!JWT_SECRET) {
             console.error('FATAL: JWT_SECRET não está definida no .env');
        }
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};