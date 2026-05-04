const express = require('express');
const router = express.Router();
const { protect } = require('../../middlewares/auth.middleware');
const { handleInternalTransfer, handleHistory, handleStatus } = require('./transaction.controller');

router.post('/internal', protect, handleInternalTransfer);
router.get('/log', protect, handleHistory);
router.get('/verify-status/:reference', protect, handleStatus);

module.exports = router;
