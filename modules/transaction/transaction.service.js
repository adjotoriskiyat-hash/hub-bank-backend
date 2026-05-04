const Transaction = require('../../models/transaction.model');
const Customer = require('../../models/customer.model');

const createTxnRef = () => {
  return 'HUB-' + Date.now() + '-' + Math.floor(Math.random() * 1000000);
  };

  const processInternalTransfer = async (senderId, receiverAccountNumber, transferAmount, remark) => {
    const senderAccount = await Customer.findById(senderId);
      if (!senderAccount) throw new Error('Originating account not found.');
        if (senderAccount.balance < transferAmount) throw new Error('Insufficient funds for this transaction.');

          const receiverAccount = await Customer.findOne({ accountNumber: receiverAccountNumber });
            if (!receiverAccount) throw new Error('Destination account could not be found.');
              if (senderAccount._id.equals(receiverAccount._id)) throw new Error('Cannot transfer funds to the same account.');

                const txnReference = createTxnRef();

                  // Deduct and Add
                    senderAccount.balance -= transferAmount;
                      await senderAccount.save();

                        receiverAccount.balance += transferAmount;
                          await receiverAccount.save();

                            // Log Transaction
                              const newTxn = await Transaction.create({
                                  initiator: senderAccount._id,
                                      destinationAccount: receiverAccountNumber,
                                          destinationBankCode: 'HUB001',
                                              transferAmount,
                                                  transferCategory: 'internal',
                                                      txnReference,
                                                          txnState: 'completed',
                                                              remark
                                                                });

                                                                  return newTxn;
                                                                  };

                                                                  const fetchTxnHistory = async (clientId) => {
                                                                    const history = await Transaction.find({ initiator: clientId }).sort({ createdAt: -1 });
                                                                      return history;
                                                                      };

                                                                      const verifyTxnStatus = async (txnReference) => {
                                                                        const txn = await Transaction.findOne({ txnReference });
                                                                          if (!txn) throw new Error('Transaction reference not found in ledger.');
                                                                            return txn;
                                                                            };

                                                                            module.exports = { processInternalTransfer, fetchTxnHistory, verifyTxnStatus };
                                                                            