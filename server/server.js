require('dotenv').config({ path: './.env' });
const express = require('express');
const passport = require('passport');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const pinologger = require('express-pino-logger');

const connectMongoDB = require('./config/mongodb');
const { logger } = require('./config/logger');

const app = express();

const eplMiddleware = pinologger({
  logger: logger,
  useLevel: 'debug'
});

const PORT = process.env.PORT || 5000;

const buildPath = path.join(__dirname, '..', 'build');

// Middleware
app.use(express.json());
app.use(express.static(buildPath));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);

app.use(eplMiddleware);
app.use(
  session({
    secret: 'secretcodeforum',
    resave: true,
    saveUninitialized: true
  })
);
require('./config/passportConfig')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api', require('./routes'));
app.get('/health', async (req, res) => {
  req.log.info('something else');
  res.json({
    status: true,
    message: 'Server is up and running'
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

connectMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Server listening on ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error(err);
  });
