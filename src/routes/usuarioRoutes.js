const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', UsuarioController.register);
router.post('/login', UsuarioController.login);
router.get('/perfil', authMiddleware, UsuarioController.getProfile);
router.put('/perfil', authMiddleware, UsuarioController.upload, UsuarioController.updateProfile);

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const UsuarioController = require('../controllers/usuarioController');

// router.post('/register', UsuarioController.register);
// router.post('/login', UsuarioController.login);

// module.exports = router;