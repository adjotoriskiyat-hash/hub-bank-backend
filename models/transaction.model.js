const mongoose = require('mongoose');

const transferSchema = new mongoose.Schema({
  initiator: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    destinationAccount: String,
      destinationBankCode: String,
        transferAmount: Number,
          transferCategory: { type: String, enum: ['internal', 'external'], required: true },
            txnReference: { type: String, unique: true, required: true },
              txnState: { type: String, default: 'processing', enum: ['processing', 'completed', 'declined'] },
                remark: String,
                }, { timestamps: true });

                module.exports = mongoose.model('Transaction', transferSchema);
                