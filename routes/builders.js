var express = require('express');
var router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');
const sequelize = require('../sequelize');
const { builder } = sequelize.models;

/* GET builder listing. */
router.get('/builders', connectEnsureLogin.ensureLoggedIn(), async function(req, res) {
  res.send(await builder.findAll());
});

/**
 * GET builder by id
 */
router.get('/builders/:id', connectEnsureLogin.ensureLoggedIn(), async function(req, res) {
    res.send(await builder.findByPk(req.params.id));
});

/**
 * builder search by name
 */
router.get('/builders/search/:name', connectEnsureLogin.ensureLoggedIn(), async function(req, res) {
    res.send(await builder.findAll({ where: {name: req.params.name} }));
});

module.exports = router;
