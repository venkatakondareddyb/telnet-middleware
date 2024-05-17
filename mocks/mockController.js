require('dotenv').config();
const net = require('net');
const logger = require('../src/services/logger');

const PORT = process.env.CONTROLLER_PORT || 2323;
const HOST = process.env.HOST || '127.0.0.1';

const server = net.createServer((socket) => {
    logger.info('Mock Controller connected by middleware');

    socket.on('data', (data) => {
        logger.info(`Controller received: ${data.toString().trim()}`);
        const response = `Echo: ${data.toString().trim()}\r\n`;
        logger.info(`Controller sending: ${response.trim()}`);
        socket.write(response);
    });

    socket.on('close', () => {
        logger.info('Mock Controller connection closed');
    });
});

server.listen(PORT, HOST, () => {
    logger.info(`Mock Controller listening on ${HOST}:${PORT}`);
});