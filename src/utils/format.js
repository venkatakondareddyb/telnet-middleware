const formatLogMessage = (level, message) => {
  const timestamp = new Date().toISOString();
  return `${timestamp} [${level}] ${message}`;
};

module.exports = { formatLogMessage };
