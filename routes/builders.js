var express = require('express');
var router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');
const sequelize = require('../sequelize');
const { builder } = sequelize.models;

/* GET users listing. */
router.get('/', connectEnsureLogin.ensureLoggedIn(), async function(req, res) {
  res.send(await builder.findAll());
});

router.get('/:id', connectEnsureLogin.ensureLoggedIn(), async function(req, res) {
    res.send(await builder.findByPk(req.params.id));
});

router.get('/search/:name', connectEnsureLogin.ensureLoggedIn(), async function(req, res) {
    res.send(await builder.findAll({ where: {name: req.params.name} }));
});

module.exports = router;