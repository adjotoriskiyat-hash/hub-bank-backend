const Transaction = require('../../models/transaction.model');
const Customer = require('../../models/customer.model');
const nibbs = require('../../services/nibbs.service');

const executeTransfer = async (senderId, details) => {
  const { destinationAccount, destinationBankCode, transferAmount, remark } = details;
    
      const sender = await Customer.findById(senderId);
        if (sender.balance < transferAmount) throw new Error('Insufficient funds');

          // Check if it's a Hub Bank user
            const receiver = await Customer.findOne({ accountNumber: destinationAccount });
              const category = receiver ? 'internal' : 'external';

                const txn = await Transaction.create({
                    initiator: senderId,
                        destinationAccount,
                            transferAmount,
                                transferCategory: category,
                                    txnReference: `HUB-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
                                        remark
                                          });

                                            // Deduct from you
                                              sender.balance -= Number(transferAmount);
                                                await sender.save();

                                                  if (category === 'internal') {
                                                      // Hub Bank to Hub Bank
                                                          receiver.balance += Number(transferAmount);
                                                              await receiver.save();
                                                                  txn.txnState = 'completed';
                                                                      await txn.save();
                                                                        } else {
                                                                            // Hub Bank to Other Banks!
                                                                                if (!destinationBankCode) throw new Error('Bank code required for external transfers');
                                                                                    
                                                                                        // Call your NIBSS integration to push the money out
                                                                                            const externalResponse = await nibss.processInterbankTransfer({
                                                                                                  accountNumber: destinationAccount,
                                                                                                        bankCode: destinationBankCode,
                                                                                                              amount: transferAmount,
                                                                                                                    reference: txn.txnReference
                                                                                                                        });

                                                                                                                            if (externalResponse.success) {
                                                                                                                                  txn.txnState = 'completed';
                                                                                                                                      } else {
                                                                                                                                            txn.txnState = 'failed';
                                                                                                                                                  // Refund the money if NIBSS fails!
                                                                                                                                                        sender.balance += Number(transferAmount);
                                                                                                                                                              await sender.save();
                                                                                                                                                                  }
                                                                                                                                                                      await txn.save();
                                                                                                                                                                        }

                                                                                                                                                                          return txn;
                                                                                                                                                                          };

                                                                                                                                                                          const getHistory = async (userId) => {
                                                                                                                                                                            return await Transaction.find({ initiator: userId }).sort({ createdAt: -1 });
                                                                                                                                                                            };

                                                                                                                                                                            module.exports = { executeTransfer, getHistory };
