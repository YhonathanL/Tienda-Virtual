const express = require('express');
const userlogin = require('../routes/userlogin');
const router = express.Router();

router.use('/user', userlogin);

module.exports = router;