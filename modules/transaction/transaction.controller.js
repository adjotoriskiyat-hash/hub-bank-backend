const { processInternalTransfer, fetchTxnHistory, verifyTxnStatus } = require('./transaction.service');

const handleInternalTransfer = async (req, res) => {
  try {
    const { receiverAccountNumber, transferAmount, remark, destinationBankCode } = req.body;
    
    if (!receiverAccountNumber || !transferAmount) {
      return res.status(400).json({ error: 'Destination account and amount are required.' });
    }

    // Logic: If bankCode is Hub Bank or missing, it's internal. 
    // Otherwise, it will eventually call the Phoenix service.
    const result = await processInternalTransfer(req.user._id, receiverAccountNumber, transferAmount, remark, destinationBankCode);
    
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
};

const handleHistory = async (req, res) => {
  try {
    // Ensures user only sees THEIR own data
    const logs = await fetchTxnHistory(req.user._id);
    return res.status(200).json({ success: true, data: logs });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
};

const handleStatus = async (req, res) => {
  try {
    const { reference } = req.params;
    const statusData = await verifyTxnStatus(reference);
    return res.status(200).json({ success: true, data: statusData });
  } catch (err) {
    return res.status(404).json({ success: false, error: err.message });
  }
};

module.exports = { handleInternalTransfer, handleHistory, handleStatus };
  
