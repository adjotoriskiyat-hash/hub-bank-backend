require('dotenv').config();
require('express-async-errors');
const express = require('express');
const connectDB = require('./config/db');

const authenticationRouter = require('./modules/auth/auth.route');
const userAccountRouter = require('./modules/account/account.route');
const bankTransactionRouter = require('./modules/transaction/transaction.route');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Welcome to the Hub Bank Core API System' });
  });

  app.use('/api/auth', authenticationRouter);
  app.use('/api/account', userAccountRouter);
  app.use('/api/transaction', bankTransactionRouter);

  app.use((err, req, res, next) => {
    console.error('Server Exception:', err.message);
      res.status(500).json({ success: false, error: err.message || 'An internal server error occurred.' });
      });

      const SERVER_PORT = process.env.PORT || 3000;

      connectDB().then(() => {
        app.listen(SERVER_PORT, () => console.log(`🚀 Hub Bank server is actively listening on port ${SERVER_PORT}`));
        });
        