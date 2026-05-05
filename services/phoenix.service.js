const axios = require('axios');

const phoenixAPI = axios.create({
  baseURL: process.env.NIBSS_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
            'x-api-key': process.env.PHOENIX_API_KEY,
                'x-api-secret': process.env.PHOENIX_API_SECRET
                  }
                  });

                  // Requirement 1: BVN/NIN Validation
                  const verifyIdentity = async (bvn) => {
                    try {
                        const response = await phoenixAPI.post('/validateBvn', { bvn });
                            return response.data;
                              } catch (error) {
                                  console.log("Phoenix Verification Error:", error.response?.data || error.message);
                                      throw new Error('Identity verification failed at NIBSS. Please check your BVN.');
                                        }
                                        };

                                        // Requirement 3: Inter-bank Transfer
                                        const performExternalTransfer = async (transferData) => {
                                          try {
                                              const response = await phoenixAPI.post('/transfer', {
                                                    ...transferData,
                                                          senderBankCode: process.env.HUB_BANK_CODE // Your bank code (128)
                                                              });
                                                                  return response.data;
                                                                    } catch (error) {
                                                                        console.log("Phoenix Transfer Error:", error.response?.data || error.message);
                                                                            throw new Error('External transfer failed at NIBSS.');
                                                                              }
                                                                              };

                                                                              module.exports = { verifyIdentity, performExternalTransfer };
                                                                              