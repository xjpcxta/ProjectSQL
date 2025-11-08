const express = require('express');
const router = express.Router();
const heroiController = require('../controllers/heroicontroller');
const usuarioController = require('../controllers/usuariocontroller');
const { checkAuth, checkRole } = require('../middleware/authMiddleware');

router.get('/herois', heroiController.buscarTodosHerois);

router.get('/herois/:id', heroiController.buscarHeroiPorId);

router.put(
    '/herois/:id', 
    checkAuth, 
    checkRole(['admin', 'editor']), 
    heroiController.atualizarHeroi
);
router.post('/login', usuarioController.login);

module.exports = router;