// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');

router.get('/', mainController.index); //router.metodo de http
router.get('/search', mainController.search); //los formularios de busqueda modifican la url agregando lo que escribimos para buscar. Va por get. query string

module.exports = router;
  