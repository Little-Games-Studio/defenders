import * as Phaser from 'phaser';
import { GameScene } from './gameScene';
import { Player } from '../gameObjects/player/player'

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: true,
    visible: true,
    key: 'HUD',
};

export class HUDScene extends Phaser.Scene {

    private myGame: GameScene;

    private label_1: any;
    private score_text_1: any;
    private speed_text_1: any;

    private label_2: any;
    private score_text_2: any;
    private speed_text_2: any;

    constructor() {
        super(sceneConfig);
    }

    create() {

        //  Grab a reference to the Game Scene
        this.myGame = this.scene.get('GameScene') as GameScene;

        // Player 1
        this.label_1 = this.add.text(10, 10, 'Player 1', { font: '28px Arial' });
        this.score_text_1 = this.add.text(10, 50, 'Score: 0', { font: '18px Arial' });
        this.speed_text_1 = this.add.text(10, 80, 'Speed: 0 km/h', { font: '18px Arial' });

        // Player 2
        var x = 150;
        this.label_2 = this.add.text(this.cameras.main.width - x, 10, 'Player 2', { font: '28px Arial' });
        this.score_text_2 = this.add.text(this.cameras.main.width - x, 50, 'Score: 0', { font: '18px Arial' });
        this.speed_text_2 = this.add.text(this.cameras.main.width - x, 80, 'Speed: 0 km/h', { font: '18px Arial' });
    }

    update(): void {
        this.score_text_1.setText('Score: ' + this.myGame.score);
        this.score_text_2.setText('Score: ' + this.myGame.score);
        this.speed_text_1.setText('Speed: ' + (this.myGame.player_1 ? Math.floor(this.myGame.player_1.speed) : 0) + ' km/h');
        this.speed_text_2.setText('Speed: ' + (this.myGame.player_2 ? Math.floor(this.myGame.player_2.speed) : 0) + ' km/h');
    }
}