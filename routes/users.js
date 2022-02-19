var express = require('express');
var router = express.Router();
const connectEnsureLogin = require('connect-ensure-login'); 

/* GET users listing. */
router.get('/', connectEnsureLogin.ensureLoggedIn(), function(req, res) {
  console.log(req.user)
  res.send('respond with a resource for ' + req.user.username);
});

module.exports = router;
