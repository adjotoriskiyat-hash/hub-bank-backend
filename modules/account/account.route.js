const express = require('express');
const router = express.Router();
const { protect } = require('../../middlewares/auth.middleware');
const { fetchBalance, verifyAccountName } = require('./account.controller');

router.get('/my-balance', protect, fetchBalance);
router.get('/lookup/:accountNumber', protect, verifyAccountName);

module.exports = router;
