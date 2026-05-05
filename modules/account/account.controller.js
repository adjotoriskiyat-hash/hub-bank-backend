const { retrieveBalance, executeNameEnquiry } = require('./account.service');

const fetchBalance = async (req, res) => {
  try {
    const accountData = await retrieveBalance(req.user._id);
    return res.status(200).json({ 
      success: true, 
      message: "Balance retrieved",
      data: {
        accountNumber: accountData.accountNumber,
        balance: accountData.balance 
      } 
    });
  } catch (error) {
    return res.status(404).json({ success: false, error: error.message });
  }
};

const verifyAccountName = async (req, res) => {
  try {
    const { accountNumber } = req.params;
    if (!accountNumber) return res.status(400).json({ success: false, error: 'Please provide a valid account number.' });

    const accountDetails = await executeNameEnquiry(accountNumber);
    return res.status(200).json({ success: true, data: accountDetails });
  } catch (error) {
    return res.status(404).json({ success: false, error: error.message });
  }
};

module.exports = { fetchBalance, verifyAccountName };
