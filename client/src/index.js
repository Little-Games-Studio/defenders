import './index.css'

import Phaser from 'phaser'

import { GameScene } from './scenes/gameScene'
import { MainMenuScene } from './scenes/mainMenuScene'
import { CreateSessionScene } from './scenes/createSessionScene'
import { JoinSessionScene } from './scenes/joinSessionScene'
import { LeaveSessionScene } from './scenes/leaveSessionScene'
import { HUDScene } from './scenes/hudScene'
import { GameOverScene } from './scenes/gameOverScene'

import { GameManager } from './plugins/GameManager'

var config = {
    parent: "game",
    type: Phaser.AUTO,
    width: 1600,
    height: 768,
    backgroundColor: '#3a7e97',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    dom: {
        createContainer: true
    },
    audio: {
        disableWebAudio: true
    },
    scene: [
        MainMenuScene,
        CreateSessionScene,
        JoinSessionScene,
        LeaveSessionScene,
        GameScene
    ],
    plugins: {
        global: [
            {
                key: 'GameManager',
                plugin: GameManager,
                start: true,
                mapping: 'gameManager'
            }
        ]
    }
};

const game = new Phaser.Game(config);


