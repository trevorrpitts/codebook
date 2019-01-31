// help from https://github.com/nkholski/phaser3-es6-webpack

const keys = 'UP,DOWN,LEFT,RIGHT,SPACE,W,A,S,D'
let player, keys, bad

class GameScene extends Phaser.Scene {
    preload() {
        this.load.image('goblet', './assets/goblet.png')
        this.load.image('antarctica', './assets/antarctica.png')
    }
    create() {
        this.cameras.main.setBounds(0, 0, 1024, 2048);

        this.add.image(0, 0, 'antarctica').setOrigin(0).setScrollFactor(1);

        cursors = this.input.keyboard.createCursorKeys();
    }
    update() {

    }
}

let game = new Phaser.Game({
    pixelArt: true,
    roundPixels: true,
    width: 400,
    height: 240,
    physics: {
        default: 'arcade',
    },
    scene: [
        GameScene,
    ]
})

