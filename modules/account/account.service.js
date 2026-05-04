const Customer = require('../../models/customer.model');

const retrieveBalance = async (clientId) => {
  const client = await Customer.findById(clientId);
    if (!client) throw new Error('Client record missing.');
      if (!client.accountNumber) throw new Error('No active account number found for this profile.');

        return {
            accountNumber: client.accountNumber,
                availableBalance: client.balance,
                    bankName: client.bankName
                      };
                      };

                      const executeNameEnquiry = async (accountNumber) => {
                        const client = await Customer.findOne({ accountNumber });
                          if (!client) throw new Error('Account number could not be resolved.');

                            return {
                                accountNumber: client.accountNumber,
                                    accountName: `${client.firstName} ${client.lastName}`,
                                        bankName: client.bankName
                                          };
                                          };

                                          module.exports = { retrieveBalance, executeNameEnquiry };
                                          