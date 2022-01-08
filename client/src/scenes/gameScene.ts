import * as Phaser from 'phaser';
import InputText from 'phaser3-rex-plugins/plugins/inputtext.js';

/* import * as background from './../assets/images/background.png' */
//import * as racing_mp3 from './../assets/audio/racing.mp3'
import * as player_sprite from './../assets/images/player.png'

import { Player } from '../gameObjects/player/player';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: true,
    key: 'GameScene',
    physics: {
        arcade: {
            debug: true,
        },
        matter: {
            debug: true,
            gravity: false
        }
    },
};

export class GameScene extends Phaser.Scene {

    public player: Player;

    private gameManager: any;
    private players: any;

    /* public background: Phaser.GameObjects.TileSprite; */

    private keyW: Phaser.Input.Keyboard.Key;
    private keyA: Phaser.Input.Keyboard.Key;
    private keyS: Phaser.Input.Keyboard.Key;
    private keyD: Phaser.Input.Keyboard.Key;

    private music: any;

    constructor() {
        super(sceneConfig);
    }

    preload(): void {
        /* this.load.image('background', background); */
        this.load.image('player', player_sprite);
        //this.load.audio('music', [music]);

        // KEYS
        this.keyW = this.input.keyboard.addKey('W');
        this.keyA = this.input.keyboard.addKey('A');
        this.keyS = this.input.keyboard.addKey('S');
        this.keyD = this.input.keyboard.addKey('D');
    }

    create(): void {

        this.gameManager = this.plugins.get('GameManager');

        this.players = this.add.group();

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;

        /* this.background = this.add.tileSprite(0, 0, 1600, 768, 'background').setOrigin(0); */

        this.add.text(30, 30, 'Session:', { font: '22px Calibri' });

        var inputText = new InputText(this, 260, 42, 300, 30, { // x, y, width, height
            type: 'text',
            text: this.gameManager.session,
            fontSize: '22px',
            fontFamily: 'Calibri',
            readOnly: true,
            align: 'left',
        });

        this.add.text(30, 70, this.gameManager.getUsername(), { font: '28px Calibri' });

        this.add.existing(inputText);

        Object.keys(this.gameManager.players).forEach((id) => {

            if (this.gameManager.players[id].id === this.gameManager.socket.id) {
                this.displayPlayer(this.gameManager.players[id], 'self');
            }
            else {
                this.displayPlayer(this.gameManager.players[id], 'enemy');
            }
        });

        this.gameManager.socket.on('currentPlayers', (players) => {

            this.players.clear(true, true)

            Object.keys(players).forEach((id) => {
                
                if (players[id].id === this.gameManager.socket.id) {
                    this.displayPlayer(players[id], 'self');
                }
                else {
                    this.displayPlayer(players[id], 'enemy');
                }
            });
        });

        //this.music = this.sound.add('music');
        //this.music.loop = true;


        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.launch('LeaveSessionScene');
            this.scene.pause('GameScene');
        }, this);
/*
        this.events.on('pause', () => {
           // this.music.pause();
            console.log('Game paused');
        })

        this.events.on('resume', () => {
         //   this.music.resume();
            console.log('Game resumed');
        })*/

        /* this.music.pause();
        this.scene.pause('GameScene'); */
    }

    update(time, delta): void {

    }

    displayPlayer(playerInfo, playerType) {
        const player = new Player(this, playerInfo, playerType);
        this.players.add(player);
    }
}