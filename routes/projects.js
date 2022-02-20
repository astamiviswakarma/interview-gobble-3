var express = require('express');
var router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');
const sequelize = require('../sequelize');
const { project } = sequelize.models;


/* GET projects listing. */
router.get('/', connectEnsureLogin.ensureLoggedIn(), async function(req, res) {
    res.send(await project.findAll());
});

/**
 * GET project by id
 */
router.get('/:id', connectEnsureLogin.ensureLoggedIn(), async function(req, res) {
    res.send(await project.findByPk(req.params.id));
});

/**
 * project search by name
 */
router.get('/search/:name', connectEnsureLogin.ensureLoggedIn(), async function(req, res) {
    res.send(await project.findAll({ where: {name: req.params.name} }));
});

module.exports = router;
