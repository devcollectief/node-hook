'use strict';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Node Hook', globals: { git: __gitv, dir: __appdir, env: __appenv } });
});

module.exports = router;
