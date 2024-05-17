const fs = require('fs');
const path = require('path');
const { logFilePath } = require('../config');
const { formatLogMessage } = require('../utils/format');

const logFile = path.resolve(logFilePath);

const writeLog = (message) => {
    fs.appendFileSync(logFile, message + '\n', 'utf8');
    console.log(message);
};

const logger = {
    info: (message) => {
        const logMessage = formatLogMessage('INFO', message);
        writeLog(logMessage);
    },
    error: (message) => {
        const logMessage = formatLogMessage('ERROR', message);
        writeLog(logMessage);
    }
};

module.exports = logger;
