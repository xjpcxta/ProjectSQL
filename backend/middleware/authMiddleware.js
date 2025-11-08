const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

exports.checkAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Acesso negado. Token mal formatado.' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        
        req.usuario = decoded;
        next();

    } catch (error) {
        console.warn('Falha na autenticação:', error.message);
        return res.status(401).json({ message: 'Token inválido ou expirado.' });
    }
};

exports.checkRole = (rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.usuario || !req.usuario.grupo) {
            return res.status(403).json({ message: 'Erro de permissão. Dados do usuário não encontrados.' });
        }

        const grupoUsuario = req.usuario.grupo;

        if (rolesPermitidos.includes(grupoUsuario)) {
            next(); 
        } else {
            return res.status(403).json({ 
                message: `Acesso negado. Você precisa ser [${rolesPermitidos.join(' ou ')}] para esta ação.` 
            });
        }
    };
};