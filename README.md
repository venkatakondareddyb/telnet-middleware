# Telnet Middleman Script

A Node.js script to act as a middleman for a telnet connection, logging all data sent between a device and a controller while maintaining full functionality of the original connection.

## Features

- Creates a server to accept connections from the device.
- Connects to a controller and forwards data between the device and controller.
- Logs all events and data transfers to a log file for easy debugging.
- Uses environment variables for configuration.

## Prerequisites

- Node.js (v14 or later)
- npm

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/venkatakondareddyb/telnet-middleware
    cd telnet-middleware
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the server:
    ```sh
    npm start
    ```

## Configuration

The configuration is managed through the `.env` file. Modify the values as needed.

Create a `.env` file with the following content in root folder:
    ```env
    CONTROLLER_IP=127.0.0.1
    CONTROLLER_PORT=2323
    DEVICE_PORT=23
    LOG_FILE_PATH=./src/logs/middleware.log
    ```


### Testing with a Mock Script using below steps

1. Run the Mock Controller:
    ```bash
    node mocks/mockController.js
    ```

2. Run the Middleman Script:
    ```bash
    npm start
    ```

3. Connect Using a Telnet Client:
    ```bash
    telnet localhost 23
    ```


### Running Tests using Mocha

    ```bash
    npm test
    ```

## Project Structure

- `src/index.js`: Entry point to start the server.
- `src/server.js`: Creates the server and handles incoming connections.
- `src/client.js`: Creates the client and connects to the controller.
- `src/logger.js`: Handles logging to the file.
- `logs/`: Directory to store log files.
- `mocks/`: Directory containing mock scripts of controller for testing.

### Contributing

Contributions are welcome! Please open an issue or submit a pull request.
For any inquiries, please contact: kondareddy50096@gmail.com.

### License

This project is licensed under the MIT License.