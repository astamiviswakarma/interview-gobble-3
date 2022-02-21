var express = require('express');
var router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');
const sequelize = require('../sequelize');
const { city } = sequelize.models;


/* GET city listing. */
router.get('/cities', connectEnsureLogin.ensureLoggedIn(), async function(req, res) {
  const cities = await city.findAll();
  res.send({records: cities, queryRecordCount: cities.length, totalRecordCount: cities.length});
});

/**
 * GET city by id
 */
router.get('/cities/:id', connectEnsureLogin.ensureLoggedIn(), async function(req, res) {
    res.send(await city.findByPk(req.params.id));
});

/**
 * city search by name
 */
router.get('/cities/search/:name', connectEnsureLogin.ensureLoggedIn(), async function(req, res) {
    res.send(await city.findAll({ where: {name: req.params.name} }));
});

/**
 * city search by pincode
 */
router.get('/cities/pincode/:pincode', connectEnsureLogin.ensureLoggedIn(), async function(req, res) {
    res.send(await city.findAll({ where: {pincode: req.params.pincode} }));
});


module.exports = router;
