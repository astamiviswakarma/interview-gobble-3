var express = require('express');
var router = express.Router();
const passport = require('passport');
const connectEnsureLogin = require('connect-ensure-login');
const async = require('async');
const sequelize = require('../sequelize');
const { Op } = require("sequelize");
const { project, builder, city } = sequelize.models;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/login', passport.authenticate('local', { successReturnToOrRedirect: '/users', failureRedirect: '/login' }));

router.get('/searchall/:search', connectEnsureLogin.ensureLoggedIn(), async function(req, res) {
  res.send(await async.parallel({
    cities: callback => city.findAll({
      where:{
        name: {[Op.substring]: req.params.search}
      }})
      .then((data) => callback(null, data))
      .catch(err => callback(null, [])),
    projects: callback => project.findAll({
      where:{
        name: {[Op.substring]: req.params.search}
      }})
      .then((data) => callback(null, data))
      .catch(err => callback(null, [])),
    builders: callback => builder.findAll({
      where:{
        name: {[Op.substring]: req.params.search}
      }})
      .then((data) => callback(null, data))
      .catch(err => callback(null, [])),
  }));
});

module.exports = router;
