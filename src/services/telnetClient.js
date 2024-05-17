const net = require('net');
const { controllerIp, controllerPort } = require('../config');
const logger = require('./logger');

const createTelnetClient = () => {
    const client = new net.Socket();

    logger.info('Client created');

    client.connect(controllerPort, controllerIp, () => {
        logger.info('Client connected');
    });

    client.on('close', () => {
        logger.info('Client disconnected');
    });

    client.on('error', (err) => {
        logger.error(`Client error: ${err.message}`);
    });

    return client;
};

module.exports = { createTelnetClient };
