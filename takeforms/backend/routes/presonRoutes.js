const express = require('express');
const router = express.Router();
const personController = require('../controllers/personController');

// Buscar por documento (CPF ou CNPJ)
router.get('/search/:document', personController.searchByDocument);

module.exports = router;
