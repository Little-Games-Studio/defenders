# Defenders - Node.js Server

## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

## Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm start` | Build project and open web server running project |
| `npm start-dev` | Build project and open web server running project in debug mode |
| `npm test` | Build project and run unit tests |

## Writing Code

After cloning the repo, run `npm install` from your project directory, you can start the local development server in debug mode by running `npm start-dev`.

Then, open up Chrome and visit the following URL: chrome://inspect/#devices.

Click on the "Open dedicated DevTools for Node" link which will open a new browser window that will have a console that will display the output of the dom. By clicking this link, even when you stop and restart your server that console will stay linked to your Node session and you should see the updated output.