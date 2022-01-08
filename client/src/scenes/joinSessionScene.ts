import * as Phaser from 'phaser';
import InputText from 'phaser3-rex-plugins/plugins/inputtext.js';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: true,
    key: 'JoinSessionScene'
};

export class JoinSessionScene extends Phaser.Scene {

    private gameManager: any;

    private inputText: any;
    private joinButton: any;
    private backButton: any;

    constructor() {
        super(sceneConfig);
    }

    create(data: { is_paused: any; }): void {

        this.gameManager = this.plugins.get('GameManager');

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        const menuTopPosition = screenCenterY - 105;

        this.add.text(screenCenterX, menuTopPosition, 'Join Session', { font: '48px Calibri' }).setOrigin(0.5);

        // https://rexrainbow.github.io/phaser3-rex-notes/docs/site/inputtext/#style
        this.inputText = new InputText(this, screenCenterX, menuTopPosition + 65, 400, 50, { // x, y, width, height
            type: 'text',
            text: localStorage.getItem('session'),
            fontSize: '28px',
            placeholder: 'Enter session ID',
            align: 'center',
            border: 5,
            /* backgroundColor: '#fff', */
            borderColor: '#797D81',
        })
            .setOrigin(0.5)
            .on('textchange', (inputText) => {
                if (inputText.text.length > 0) {
                    this.activateJoinButton();
                }
                else {
                    this.deactivateJoinButton();
                }
            })
            .on('focus', (inputText) => {
                if (inputText.text.length > 0) {
                    this.activateJoinButton();
                }
            })

        this.add.existing(this.inputText);

        this.joinButton = this.add.text(screenCenterX, screenCenterY + 25, "JOIN",
            {
                font: '28px Calibri',
                color: '#797D81',
            }).setOrigin(0.5);
        
        if (localStorage.getItem('session').length > 0) {
            this.activateJoinButton()
        }

        this.joinButton.once('pointerup', () => {
            this.handleJoinClick();
        });

        this.backButton = this.add.text(screenCenterX, screenCenterY + 75, "BACK",
            {
                font: '28px Calibri'
            }).setOrigin(0.5);
        
        this.backButton.setInteractive();

        this.backButton.once('pointerup', () => {
            this.scene.start('MainMenuScene');
        });
    }

    activateJoinButton() {
        this.joinButton.setInteractive();
        this.joinButton.setColor('#fff');
    }

    deactivateJoinButton() {
        this.joinButton.disableInteractive();
        this.joinButton.setColor('#797D81');
    }

    handleJoinClick() {
        this.gameManager.session = this.inputText.text;
        localStorage.setItem('session', this.inputText.text);
        this.gameManager.socket.emit('join-session', this.inputText.text);
        this.scene.start('GameScene');
    }
}