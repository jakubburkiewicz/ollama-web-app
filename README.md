# Ollama Web App

## Description

A Web-based UI for the Ollama project.

The project is in development phase.

## Requirements

- Node.js
- npm

## Installation

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Run `npm run build` to build the project

Now you can move the `/build` folder to your web server and access the app.

Alternatively, you can run `npm start` to start a development server.

## Usage

The app is a simple web interface for the Ollama project. It allows the user to interact with the Ollama API without the need of a command line interface.

For now, it only works with the local Ollama instance. (Will be upgraded soon).

## Features

### Chat

The chat interface allows the user to send messages to the Ollama instance and receive responses.

<p align="center">
  <img src="https://github.com/jakubburkiewicz/ollama-web-app/raw/0.1.0/ollama-web-app-screenshot.png" alt="Chat Screenshot">
</p>

#### Model Selection

The user can select the model to use for the chat.

List of models are fetched from the Ollama instance.

#### Chat History

The chat history is displayed in the chat interface.

#### Message Input

The user can input messages to send to the Ollama instance.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.