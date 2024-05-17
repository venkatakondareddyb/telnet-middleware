const { createTelnetClient } = require('../services/telnetClient');
const logger = require('../services/logger');

module.exports = {
    handleDeviceConnection: (deviceSocket) => {
        logger.info('New connection to the server');
        
        const clientSocket = createTelnetClient();

        deviceSocket.on('data', (data) => {
            logger.info(`Server received data: ${data.toString().trim()}`);
            clientSocket.write(data);
        });

        deviceSocket.on('close', () => {
            logger.info('Device disconnected');
            clientSocket.end();
        });

        deviceSocket.on('error', (err) => {
            logger.error(`Server error: ${err.message}`);
        });

        clientSocket.on('data', (data) => {
            deviceSocket.write(data);
            logger.info(`Client received data: ${data.toString().trim()}`);
        });

        clientSocket.on('close', () => {
            logger.info('Client disconnected');
            deviceSocket.end();
        });

        clientSocket.on('error', (err) => {
            logger.error(`Client error: ${err.message}`);
        });
    }
};
