var express = require('express');
var router = express.Router();

router.get('/', (res, req, next) => {
    res.render('login', {});
});

module.exports = router;