import * as Phaser from 'phaser';
import InputText from 'phaser3-rex-plugins/plugins/inputtext.js';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: true,
    key: 'CreateSessionScene'
};

export class CreateSessionScene extends Phaser.Scene {

    private onePlayerButton: any;
    private twoPlayersButton: any;
    private threePlayersButton: any;
    private fourPlayersButton: any;
    private fivePlayersButton: any;

    private createButton: any;
    private backButton: any;

    private gameManager: any;

    constructor() {
        super(sceneConfig);
    }

    create(data: { is_paused: any; }): void {

        this.gameManager = this.plugins.get('GameManager');

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        const menuTopPosition = screenCenterY - 150;

        const playersTitlePosition = menuTopPosition + 55;
        const playersButtonsPosition = playersTitlePosition + 50;

        const createButtonPosition = playersButtonsPosition + 70;
        const backButtonPosition = createButtonPosition + 50;

        var buttonStyle = {
            font: '28px Calibri',
            color: '#000',
            backgroundColor: '#797D81',
            padding: {
                left: 17,
                right: 17,
                top: 12,
                bottom: 12,
            }
        };

        this.add.text(screenCenterX, menuTopPosition, 'Create Session', { font: '48px Calibri' }).setOrigin(0.5);

        this.add.text(screenCenterX, playersTitlePosition, 'Players', { font: '24px Calibri' }).setOrigin(0.5);

        this.onePlayerButton = this.add.text(screenCenterX - 150, playersButtonsPosition, "1", buttonStyle).setOrigin(0.5);
        this.onePlayerButton.setInteractive();

        if (!this.gameManager.amount_of_players || this.gameManager.amount_of_players == 1)
            this.onePlayerButton.setBackgroundColor('#fff');

        this.onePlayerButton.on('pointerup', () => {
            this.handlePlayerButtonClick(1);
        });
        
        this.twoPlayersButton = this.add.text(screenCenterX - 75, playersButtonsPosition, "2", buttonStyle).setOrigin(0.5);
        this.twoPlayersButton.setInteractive();

        if (this.gameManager.amount_of_players == 2)
            this.twoPlayersButton.setBackgroundColor('#fff');

        this.twoPlayersButton.on('pointerup', () => {
            this.handlePlayerButtonClick(2);
        });

        this.threePlayersButton = this.add.text(screenCenterX, playersButtonsPosition, "3", buttonStyle).setOrigin(0.5);
        this.threePlayersButton.setInteractive();

        if (this.gameManager.amount_of_players == 3)
            this.threePlayersButton.setBackgroundColor('#fff');

        this.threePlayersButton.on('pointerup', () => {
            this.handlePlayerButtonClick(3);
        });

        this.fourPlayersButton = this.add.text(screenCenterX + 75, playersButtonsPosition, "4", buttonStyle).setOrigin(0.5);
        this.fourPlayersButton.setInteractive();

        if (this.gameManager.amount_of_players == 4)
            this.fourPlayersButton.setBackgroundColor('#fff');

        this.fourPlayersButton.on('pointerup', () => {
            this.handlePlayerButtonClick(4);
        });

        this.fivePlayersButton = this.add.text(screenCenterX + 150, playersButtonsPosition, "5", buttonStyle).setOrigin(0.5);
        this.fivePlayersButton.setInteractive();

        if (this.gameManager.amount_of_players == 5)
            this.fivePlayersButton.setBackgroundColor('#fff');

        this.fivePlayersButton.on('pointerup', () => {
            this.handlePlayerButtonClick(5);
        });
        
        this.createButton = this.add.text(screenCenterX, createButtonPosition, "CREATE", { font: '28px Calibri' }).setOrigin(0.5);
        this.createButton.setInteractive();

        this.createButton.once('pointerup', () => {
            this.handleCreateClick();
        });

        this.backButton = this.add.text(screenCenterX, backButtonPosition, "BACK", { font: '28px Calibri' }).setOrigin(0.5);
        this.backButton.setInteractive();

        this.backButton.once('pointerup', () => {
            this.scene.start('MainMenuScene');
        });
    }

    handlePlayerButtonClick(players: integer) {

        this.gameManager.amount_of_players = players;

        if (players == 1) {
            this.onePlayerButton.setBackgroundColor('#fff');
        }
        else {
            this.onePlayerButton.setBackgroundColor('#797D81');
        }

        if (players == 2) {
            this.twoPlayersButton.setBackgroundColor('#fff');
        }
        else {
            this.twoPlayersButton.setBackgroundColor('#797D81');
        }

        if (players == 3) {
            this.threePlayersButton.setBackgroundColor('#fff');
        }
        else {
            this.threePlayersButton.setBackgroundColor('#797D81');
        }

        if (players == 4) {
            this.fourPlayersButton.setBackgroundColor('#fff');
        }
        else {
            this.fourPlayersButton.setBackgroundColor('#797D81');
        }

        if (players == 5) {
            this.fivePlayersButton.setBackgroundColor('#fff');
        }
        else {
            this.fivePlayersButton.setBackgroundColor('#797D81');
        }
    }

    handleCreateClick() {
        this.gameManager.session = this.gameManager.socket.id;
        localStorage.setItem('session', this.gameManager.socket.id);
        this.gameManager.socket.emit('create-session', { number_of_players: this.gameManager.amount_of_players });
        this.scene.start('GameScene');
    }
}