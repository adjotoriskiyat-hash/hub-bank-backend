const express = require('express');
const router = express.Router();
const { createAccount, authenticateUser } = require('./auth.controller');

router.post('/signup', createAccount);
router.post('/signin', authenticateUser);

module.exports = router;