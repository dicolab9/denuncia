const express = require('express');
const router = express.Router();
const DenunciaController = require('../controllers/denunciaController');

router.post('/denuncias', DenunciaController.create);

module.exports = router;