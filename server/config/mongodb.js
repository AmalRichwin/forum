const mongoose = require('mongoose');
const { logger } = require('./logger');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const connectionUri = process.env.MONGODB_CONNECTION_URI;

async function connectMongoDB() {
  const db = mongoose.connection;

  try {
    mongoose.connect(connectionUri, options);
    logger.info('MongoDB connected');
    db.once('open', () => logger.info('Mongodb connection open'));
    db.once('error', () => logger.error(`Mongodb connection error ${error}`));
  } catch (error) {
    setTimeout(connectMongoDB, 5000);
    logger.error(`Mongodb connection error ${error}`);
  }
}

module.exports = connectMongoDB;
