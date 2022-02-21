var express = require('express');
var router = express.Router();
const connectEnsureLogin = require('connect-ensure-login'); 

/* GET authenticated users listing. */
router.get('/', connectEnsureLogin.ensureLoggedIn(), function(req, res) {
  res.render('users', { title: 'Express', user: req.user.username });
});

module.exports = router;
