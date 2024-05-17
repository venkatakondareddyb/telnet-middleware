const net = require('net');
const { devicePort } = require('../config');
const logger = require('./logger');
const { handleDeviceConnection } = require('../controllers/connectionController');

const createTelnetServer = () => {
    const server = net.createServer(handleDeviceConnection);

    server.listen(devicePort, () => {
        logger.info('Server created');
    });

    server.on('close', () => {
        logger.info('Server disconnected');
    });

    server.on('error', (err) => {
        logger.error(`Server error: ${err.message}`);
    });

    return server;
};

module.exports = { createTelnetServer };
