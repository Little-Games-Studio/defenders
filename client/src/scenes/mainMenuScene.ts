import * as Phaser from 'phaser';
import InputText from 'phaser3-rex-plugins/plugins/inputtext.js';

import { GameManager } from './../plugins/GameManager'

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: true,
    visible: true,
    key: 'MainMenuScene'
};

export class MainMenuScene extends Phaser.Scene {

    private gameManager: GameManager;

    private createSessionButton: any;
    private joinSessionButton: any;

    private inputText: any;

    constructor() {
        super(sceneConfig);
    }

    create(data: { is_paused: any; }): void {

        this.gameManager = this.plugins.get('GameManager') as GameManager;

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        const menuTopPosition = screenCenterY - 105;

        this.add.text(screenCenterX, menuTopPosition, 'Main Menu', { font: '48px Calibri' }).setOrigin(0.5);

        // https://rexrainbow.github.io/phaser3-rex-notes/docs/site/inputtext/#style
        this.inputText = new InputText(this, screenCenterX, menuTopPosition + 65, 400, 50, { // x, y, width, height
            type: 'text',
            text: this.gameManager.getUsername(),
            fontSize: '28px',
            maxLength: 10,
            minLength: 3,
            placeholder: 'Enter your name',
            align: 'center',
            border: 5,
            borderColor: '#797D81',
        })
            .setOrigin(0.5)
            .on('textchange', (inputText) => {

                this.gameManager.setUsername(inputText.text);

                if (inputText.text.length > 2) {
                    this.activateButtons();
                }
                else {
                    this.deactivateButtons();
                }
            })
            .on('focus', (inputText) => {
                if (inputText.text.length > 2) {
                    this.activateButtons();
                }
            })

        this.add.existing(this.inputText);

        this.createSessionButton = this.add.text(screenCenterX, screenCenterY + 25, "CREATE SESSION",
            {
                font: '28px Calibri',
                color: '#797D81',
            })
            .setOrigin(0.5);

        this.createSessionButton.once('pointerup', () => {
            this.gameManager.sendUsernameToServer()
            this.scene.start('CreateSessionScene');
        });

        this.joinSessionButton = this.add.text(screenCenterX, screenCenterY + 75, "JOIN SESSION",
            {
                font: '28px Calibri',
                color: '#797D81',
            })
            .setOrigin(0.5);

        this.joinSessionButton.once('pointerup', () => {
            this.gameManager.sendUsernameToServer()
            this.scene.start('JoinSessionScene');
        });

        this.inputText.setFocus();
    }

    activateButtons() {
        this.createSessionButton.setInteractive();
        this.createSessionButton.setColor('#fff');
        this.joinSessionButton.setInteractive();
        this.joinSessionButton.setColor('#fff');
    }

    deactivateButtons() {
        this.createSessionButton.disableInteractive();
        this.createSessionButton.setColor('#797D81');
        this.joinSessionButton.disableInteractive();
        this.joinSessionButton.setColor('#797D81');
    }
}