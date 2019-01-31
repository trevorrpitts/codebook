// sets up the basics of the game with the dimensions, physics, and loading of scene
let config = {
    type: Phaser.AUTO,
    width: 683,
    height: 384,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        Main,
    },
};

// creates the game
let game = new Phaser.Game(config, 'myGame');

var CustomPipeline2 = new Phaser.Class({

    Extends: Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline,

    initialize:

    function CustomPipeline2 (game)
    {
        Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline.call(this, {
            game: game,
            renderer: game.renderer,
            fragShader: [
            "precision mediump float;",

            "uniform float     time;",
            "uniform vec2      resolution;",
            "uniform sampler2D uMainSampler;",
            "varying vec2 outTexCoord;",
            "varying vec4 outTint;",

            "#define SPEED 10.0",

            "void main( void ) {",

                "vec2 uv = outTexCoord;",
                "//uv.y *= -1.0;",
                "uv.y += (sin((uv.x + (time * 0.5)) * 10.0) * 0.1) + (sin((uv.x + (time * 0.2)) * 32.0) * 0.01);",
                "vec4 texColor = texture2D(uMainSampler, uv);",
                "gl_FragColor = texColor;",

            "}"
            ].join('\n')
        });
    } 

});

// loads images
class Main extends Phaser.Scene{
    preload ()
    {
        this.load.image('background', 'assets/background.png')
        this.load.image('sprute', 'assets/goblet.png')
        this.load.image('coin', 'assets/coin.png')
        this.load.image('ground', 'assets/ground.png')
        this.load.image('bomb', 'assets/james-madison.jpg')
    }

    create ()
    {
        this.customPipeline = this.game.renderer.addPipeline('Custom', new CustomPipeline2(this.game));
        this.customPipeline.setFloat2('resolution', this.game.config.width, this.game.config.height);

        this.cameras.main.setRenderToTexture(this.customPipeline);

        // makes background
        this.add.image(341.5, 192, 'background');


        // adds platforms and scales, places them
        platforms = this.physics.add.staticGroup();

        platforms.create(350, 379, 'ground').setScale(7,1).refreshBody();

        platforms.create(400, 150, 'ground');
        platforms.create(250, 280, 'ground');
        platforms.create(290, 220, 'ground');


        // adds player, scales them, makes them collide with game edges and with platforms
        player = this.physics.add.sprite(100, 100, 'sprute').setScale(.10,.10);

        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        this.physics.add.collider(player, platforms);


        // enables keyboard controls
        cursors = this.input.keyboard.createCursorKeys();


        // creates coins multiple times, spaces them out, and randomizes their bounce amount
        coins = this.physics.add.group({
            key: 'coin',
            repeat: 14,
            setXY: { x: 12, y: 0, stepX: 47 }
        });
        
        coins.children.iterate(function (child) {
        
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        
        });

        this.physics.add.collider(coins, platforms);

        this.physics.add.overlap(player, coins, collectCoin, null, this);



        bombs = this.physics.add.group();

        this.physics.add.collider(bombs, platforms);

        this.physics.add.collider(player, bombs, hitBomb, null, this);


        let score = 0;
        let scoreText;

        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fbc' });

    }

    update ()
    {
        /* if (gameOver)
        {
            return;
        } */

        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);
        }   
        else
        {
            player.setVelocityX(0);
        }

        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-250);
        }

        
    }

    hitBomb (player, bomb)
    {
        this.physics.pause();

        player.setTint(0xff0000);

        gameOver = true;
    }

    collectCoin (player, coins)
    {
        coins.disableBody(true, true);

        score += 1;
        scoreText.setText('Score: ' + score);

        if (coins.countActive(true) === 0)
        {
            coins.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);

            });

            let x = (player.x < 341.5) ? Phaser.Math.Between(341.5, 683) : Phaser.Math.Between(0, 341.5);

            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;

        }
    }
}