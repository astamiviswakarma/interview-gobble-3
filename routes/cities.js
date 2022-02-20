var express = require('express');
var router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');
const sequelize = require('../sequelize');
const { city } = sequelize.models;


/* GET city listing. */
router.get('/', connectEnsureLogin.ensureLoggedIn(), async function(req, res) {
  res.send(await city.findAll());
});

/**
 * GET city by id
 */
router.get('/:id', connectEnsureLogin.ensureLoggedIn(), async function(req, res) {
    res.send(await city.findByPk(req.params.id));
});

/**
 * city search by name
 */
router.get('/search/:name', connectEnsureLogin.ensureLoggedIn(), async function(req, res) {
    res.send(await city.findAll({ where: {name: req.params.name} }));
});

/**
 * city search by pincode
 */
router.get('/pincode/:pincode', connectEnsureLogin.ensureLoggedIn(), async function(req, res) {
    res.send(await city.findAll({ where: {pincode: req.params.pincode} }));
});


module.exports = router;
