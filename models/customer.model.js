const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const clientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
    lastName: { type: String, required: true },
      email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
          dob: { type: String, required: true },
            kycType: { type: String, enum: ['bvn', 'nin'], required: true },
              kycID: { type: String, required: true, unique: true },
                accountNumber: { type: String, default: null },
                  bankName: { type: String, default: 'Hub Bank' }, 
                    bankCode: { type: String, default: 'HUB001' },
                      balance: { type: Number, default: 0 },
                        isVerified: { type: Boolean, default: false }
                        }, { timestamps: true });

                        clientSchema.pre('save', async function (next) {
                          if (!this.isModified('password')) return next();
                            const saltRounds = await bcrypt.genSalt(10);
                              this.password = await bcrypt.hash(this.password, saltRounds);
                                next();
                                });

                                clientSchema.methods.verifyPassword = async function (enteredPassword) {
                                  return await bcrypt.compare(enteredPassword, this.password);
                                  };

                                  module.exports = mongoose.model('Customer', clientSchema);
                                  