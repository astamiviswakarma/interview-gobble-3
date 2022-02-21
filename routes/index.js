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

/**
 * login page
 */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

/**
 * login handler for local database
 */
router.post('/login', passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/login' }));

module.exports = router;
