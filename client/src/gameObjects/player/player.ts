import * as Phaser from 'phaser';

export class Player extends Phaser.GameObjects.GameObject {

    public id: integer;

    private sprite: Phaser.GameObjects.Sprite;
    private text: Phaser.GameObjects.Text;

    private keyW: Phaser.Input.Keyboard.Key;
    private keyA: Phaser.Input.Keyboard.Key;
    private keyS: Phaser.Input.Keyboard.Key;
    private keyD: Phaser.Input.Keyboard.Key;

    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(scene: Phaser.Scene, playerInfo: any, player_type: any) {

        super(scene, 'Player');

        this.id = playerInfo.id;

        // KEYS
        this.keyW = this.scene.input.keyboard.addKey('W');
        this.keyA = this.scene.input.keyboard.addKey('A');
        this.keyS = this.scene.input.keyboard.addKey('S');
        this.keyD = this.scene.input.keyboard.addKey('D');

        this.cursors = this.scene.input.keyboard.createCursorKeys();

        this.sprite = scene.add.sprite(playerInfo.position.x, playerInfo.position.y, 'player').setOrigin(0.5, 0.5);

        this.text = scene.add.text(playerInfo.position.x, playerInfo.position.y + 70, playerInfo.username, {
            font: '24px Calibri'
        }).setOrigin(0.5, 0.5);

        this.sprite.setTint(playerInfo.color);
        this.text.setTint(playerInfo.color);   
    }


    update(time, delta): void {

    }

    destroy() {
        this.sprite.destroy();
        this.text.destroy();
        super.destroy();
    }
}