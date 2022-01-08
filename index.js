const path = require('path');

const Datauri = require('datauri/parser');
const datauri = new Datauri();

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const express = require('express');

const app = express();
const server = require('http').Server(app);
const PORT = process.env.PORT || 5000;

const io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));

function setupAuthoritativePhaser() {
    JSDOM.fromFile(path.join(__dirname, 'authoritative_server/index.html'), {
        // To run the scripts in the html file
        runScripts: "dangerously",
        // Also load supported external resources
        resources: "usable",
        // So requestAnimatinFrame events fire
        pretendToBeVisual: true
    }).then((dom) => {

        dom.window.URL.createObjectURL = (blob) => {
            if (blob) {
                return datauri.format(blob.type, blob[Object.getOwnPropertySymbols(blob)[0]]._buffer).content;
            }
        };

        dom.window.URL.revokeObjectURL = (objectURL) => { };

        dom.window.gameLoaded = () => {
            server.listen(PORT, function () {
                console.log(`Listening on ${server.address().port}`);
            });
        };
        dom.window.io = io;
    }).catch((error) => {
        console.log(error.message);
    });
}

setupAuthoritativePhaser();