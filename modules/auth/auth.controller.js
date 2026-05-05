const { enrollNewCustomer, processLogin } = require('./auth.service');
const { verifyIdentity } = require('../../services/phoenix.service');

const createAccount = async (req, res) => {
  const { firstName, lastName, email, password, kycType, kycID, dob } = req.body;
    const missingFields = !firstName || !lastName || !email || !password || !kycType || !kycID || !dob;
      
        if (missingFields) return res.status(400).json({ error: 'Validation failed: Missing mandatory fields.' });

          try {
              // REQUIREMENT 1: Validate the BVN/NIN via the external API *before* making the account
                  await verifyIdentity(kycID);

                      // If the identity is verified, we proceed to create the account in MongoDB
                          const newCustomer = await enrollNewCustomer({ firstName, lastName, email, password, kycType, kycID, dob });
                              
                                  return res.status(201).json({ success: true, message: 'Account created successfully' });
                                    } catch (err) {
                                        return res.status(400).json({ success: false, error: err.message });
                                          }
                                          };

                                          const authenticateUser = async (req, res) => {
                                            const { email, password } = req.body;
                                              if (!email || !password) return res.status(400).json({ error: 'Login failed: Email and password are required.' });

                                                try {
                                                    const sessionData = await processLogin({ email, password });
                                                        return res.status(200).json({ success: true, data: sessionData });
                                                          } catch (err) {
                                                              return res.status(401).json({ success: false, error: err.message });
                                                                }
                                                                };

                                                                module.exports = { createAccount, authenticateUser };
                                                              