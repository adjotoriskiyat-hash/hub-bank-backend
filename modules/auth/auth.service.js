const jwt = require('jsonwebtoken');
const Customer = require('../../models/customer.model');
const nibbs = require('../../services/nibbs.service');

const createAuthToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  };

  const enrollNewCustomer = async ({ firstName, lastName, email, password, kycType, kycID, dob }) => {
    const emailExists = await Customer.findOne({ email });
      if (emailExists) throw new Error('This email is already associated with an account.');

        const kycExists = await Customer.findOne({ kycID });
          if (kycExists) throw new Error(`This ${kycType.toUpperCase()} has already been registered.`);

            let kycValidation;
              if (kycType === 'bvn') kycValidation = await nibbs.verifyBvnRecord(kycID);
                else if (kycType === 'nin') kycValidation = await nibbs.verifyNinRecord(kycID);
                  else throw new Error('Invalid KYC type. Must be bvn or nin.');

                    const isValidated = kycValidation && (kycValidation.status === 'success' || kycValidation.success === true);
                      if (!isValidated) throw new Error(`${kycType.toUpperCase()} verification failed with NIBSS.`);

                        const accountGen = await nibbs.generateVirtualAccount({ kycType, kycID, dob });
                          const generatedAccountNumber = accountGen.data?.accountNumber || ('0' + Math.floor(Math.random() * 1000000000));

                            const newClient = await Customer.create({
                                firstName, lastName, email, password, kycType, kycID, dob,
                                    accountNumber: generatedAccountNumber,
                                        isVerified: true
                                          });

                                            const token = createAuthToken(newClient._id);
                                              const clientData = newClient.toObject();
                                                delete clientData.password;

                                                  return { token, client: clientData };
                                                  };

                                                  const processLogin = async ({ email, password }) => {
                                                    const client = await Customer.findOne({ email });
                                                      if (!client) throw new Error('Invalid login credentials.');

                                                        const isMatch = await client.verifyPassword(password);
                                                          if (!isMatch) throw new Error('Invalid login credentials.');

                                                            const token = createAuthToken(client._id);
                                                              const clientData = client.toObject();
                                                                delete clientData.password;

                                                                  return { token, client: clientData };
                                                                  };

                                                                  module.exports = { enrollNewCustomer, processLogin };
                                                                  