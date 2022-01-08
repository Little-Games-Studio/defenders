import * as Phaser from 'phaser';
import { Player } from './../player/player';

const shape: Phaser.Types.Math.Vector2Like[] = [
    { x: 25, y: 0 }, // spitze
    { x: 37, y: 20 }, // rechts oben
    { x: 50, y: 50 }, // rechts mitte
    { x: 45, y: 75 },
    { x: 35, y: 87 },
    { x: 45, y: 95 },
    { x: 50, y: 103 }, // unten rechts
    { x: 25, y: 110 }, // unten mitte
    { x: 0, y: 103 }, // unten links
    { x: 5, y: 95 },
    { x: 15, y: 87 },
    { x: 5, y: 75 },
    { x: 0, y: 50 },
    { x: 15, y: 20 } // links oben
];

export class RaceCar extends Phaser.Physics.Arcade.Sprite {

    private player: Player;
    private type_of_belonging: string;

    private keyA: Phaser.Input.Keyboard.Key;
    private keyD: Phaser.Input.Keyboard.Key;

    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(player: Player, scene: Phaser.Scene, x: number, y: number, frame: number, type_of_belonging: string) {

/*         super(scene.matter.world, x, y, 'race_car', frame, {
            label: 'race_car',
            isSensor: false,
            vertices: shape,
            density: 1,
            mass: 1
        }); */

        super(scene, x, y, 'race_car', frame);

        this.player = player;
        this.type_of_belonging = type_of_belonging;

        // KEYS
        this.keyA = this.scene.input.keyboard.addKey('A');
        this.keyD = this.scene.input.keyboard.addKey('D');

        this.cursors = this.scene.input.keyboard.createCursorKeys();

        scene.add.existing(this);
    }

    update(time, delta): void {

        this.setVelocity(0, 0);

        if (this.player.is_moving_left && this.player.speed != 0) {
            this.setVelocityX(-0.5);
            /* if (this.player.speed > 0) {
                this.setAngularVelocity(-0.01);
            } */
        }

        if (this.player.is_moving_right && this.player.speed != 0) {
            this.setVelocityX(0.5);
            /* if (this.player.speed > 0) {
                this.setAngularVelocity(+0.01);
            } */
        }
        
        if (this.type_of_belonging == "opponents") {
            this.setVelocityY(-this.player.relative_speed / 20);
        }
    } 
}