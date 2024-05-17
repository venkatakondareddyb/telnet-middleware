require('dotenv').config();
const { createTelnetServer } = require('./services/telnetServer');
const logger = require('./services/logger');

logger.info('Server starting...');
createTelnetServer();
