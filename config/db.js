const mongoose = require('mongoose');

const DATABASE_URI = process.env.MONGO_URI; 

const connectDB = async () => {
  try {
      console.log('⏳ Initializing Hub Bank database connection...');
          await mongoose.connect(DATABASE_URI);
              console.log('✅ Hub Bank Database online and secured.');
                } catch (err) {
                    console.error('❌ Critical Error: Database connection failed.', err.message);
                        process.exit(1); 
                          }
                          };

                          module.exports = connectDB;
                          