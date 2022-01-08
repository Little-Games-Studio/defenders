import * as Phaser from 'phaser';

import { io } from "socket.io-client";

export class GameManager extends Phaser.Plugins.BasePlugin {

    public socket: any;
    public session: any;
    public amount_of_players: integer = 1;
    public players: any;

    private username: string = '';

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {

        this.username = localStorage.getItem('username');

        this.socket = io();

        this.socket.on("connect", () => {

            console.log("socket:", this.socket.id)

            this.socket.on("message", (message: string) => {
                console.log("server message:", message)
            });

            this.socket.on('currentPlayers', (players) => {
                this.players = players;
                console.log("gameManager - current players:", this.players);
            });
        });
    }

    sendUsernameToServer() {
        this.socket.emit("username", this.username);
    }

    getUsername() {
        return this.username;
    }

    setUsername(username) {
        this.username = username;
        localStorage.setItem('username', this.username);
    }
}