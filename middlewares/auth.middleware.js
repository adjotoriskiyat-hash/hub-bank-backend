const jwt = require('jsonwebtoken');
const Customer = require('../models/customer.model'); 

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
        try {
              const token = authHeader.split(' ')[1];
                    const decoded = jwt.verify(token, process.env.JWT_SECRET);
                          
                                req.user = await Customer.findById(decoded.id).select('-password');
                                      if (!req.user) throw new Error();

                                            return next();
                                                } catch (error) {
                                                      return res.status(401).json({ error: 'Invalid or expired token' });
                                                          }
                                                            }
                                                              
                                                                res.status(401).json({ error: 'No token provided' });
                                                                };

                                                                module.exports = { protect: verifyToken };
                                                                