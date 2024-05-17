require('dotenv').config();
const assert = require('assert');
const net = require('net');
const { createTelnetServer } = require('../src/services/telnetServer');
const fs = require('fs/promises');
const path = require('path');
const { logFilePath } = require('../src/config');

const logFile = path.resolve(logFilePath);

describe('Telnet Middleman', function() {
    let server;
    let mockDevice;
    let mockController;

    before(async function() {
        await fs.writeFile(logFile, '', 'utf8');

        mockController = net.createServer((socket) => {
            socket.on('data', (data) => {
                socket.write(`Echo: ${data}`);
            });
        }).listen(2323);
    });

    after(async function() {
        mockDevice.end();
        await new Promise((resolve) => mockController.close(resolve));
    });

    it('should log server creation and connection', async function() {
        server = createTelnetServer();

        mockDevice = new net.Socket();
        await new Promise((resolve) => {
            mockDevice.connect(23, 'localhost', resolve);
        });

        await new Promise((resolve) => setTimeout(resolve, 100));
        const logs = await fs.readFile(logFile, 'utf8');
        assert(logs.includes('[INFO] Server created'));
        assert(logs.includes('[INFO] New connection to the server'));
    });

    it('should log data transfer between device and controller', async function() {
        const message = 'Hello, Controller!';

        mockDevice.write(message);

        await new Promise((resolve) => setTimeout(resolve, 100));
        const logs = await fs.readFile(logFile, 'utf8');
        assert(logs.includes(`[INFO] Server received data: ${message}`));
        assert(logs.includes(`[INFO] Client received data: Echo: ${message}`));
    });

    it('should log disconnections', async function() {
        mockDevice.end();

        await new Promise((resolve) => setTimeout(resolve, 100));
        const logs = await fs.readFile(logFile, 'utf8');
        assert(logs.includes('[INFO] Device disconnected'));
        assert(logs.includes('[INFO] Client disconnected'));
    });
});
