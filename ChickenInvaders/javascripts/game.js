var starfield, chickens, chickenLegs, eggs, bullets, fireKey, keyboard, bank, stateText;
var counter = 0;
var bulletTime = 0;
var firingTimer = 0;
var livingChickens = [];
var Velocity = 400;
var Maxspeed = 400;
var player, player2;
var AKey, WKey, DKey;

var Game = {
    preload: function () {
        game.load.image('starfield', './images/stars_bg.png');
        game.load.image('ship', './images/spaceship1.png');
        game.load.image('ship2', './images/spaceship2.png');
        game.load.spritesheet('enemy1', './images/chickens.png', 48.3, 47);
        game.load.image('bulletsprite1', './images/bullet1.png');
        game.load.image('bulletsprite2', './images/bullet2.png');
        game.load.image('chickenleg', './images/chicken_leg.png');
        game.load.image('egg', './images/egg.png');
    },

    create: function () {
        //  Scrolling background
        starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');

        //regular chickens
        chickens = game.add.group();
        chickens.enableBody = true;
        chickens.physicsBodyType = Phaser.Physics.ARCADE;
        chickens.setAll('outOfBoundsKill', true);
        chickens.setAll('checkWorldBounds', true);
        this.createChickens();

        //  Our weapon bullets
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(20, 'bulletsprite1');
        bullets.setAll('anchor.x', .5)
        bullets.setAll('anchor.y', .5);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);

        bullets2 = game.add.group();
        bullets2.enableBody = true;
        bullets2.physicsBodyType = Phaser.Physics.ARCADE;
        bullets2.createMultiple(20, 'bulletsprite2');
        bullets2.setAll('anchor.x', .5)
        bullets2.setAll('anchor.y', .5);
        bullets2.setAll('outOfBoundsKill', true);
        bullets2.setAll('checkWorldBounds', true);

        //chickenlegs group
        chickenLegs = game.add.group();
        chickenLegs.enableBody = true;
        chickenLegs.physicsBodyType = Phaser.Physics.ARCADE;
        chickenLegs.createMultiple(10, 'chickenleg')
        chickenLegs.setAll('anchor.x', 0.5)
        chickenLegs.setAll('anchor.y', 0.5);
        chickenLegs.setAll('checkWorldBounds', true);

        //chicken egg bomb group
        eggs = game.add.group();
        eggs.enableBody = true;
        eggs.physicsBodyType = Phaser.Physics.ARCADE;
        eggs.createMultiple(30, 'egg');
        eggs.setAll('anchor.x', 0.5);
        eggs.setAll('anchor.y', 1);
        eggs.setAll('outOfBoundsKill', true);
        eggs.setAll('checkWorldBounds', true);

        //chickens decending through map
        game.time.events.loop(2000, this.descend, this);

        // player1 ship
        player = game.add.sprite(400, 520, 'ship');
        player.anchor.setTo(0.5, 0.5)
        player.scale.setTo(0.3, 0.3);
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.maxVelocity.setTo(Maxspeed, Maxspeed);
        player.alive = true;
        player.score = 0;
        player.scoreString = ' ';

        // player2 ship
        player2 = game.add.sprite(200, 520, 'ship2');
        player2.anchor.setTo(0.5, 0.5);
        player2.scale.setTo(0.3, 0.3);
        game.physics.enable(player2, Phaser.Physics.ARCADE);
        player2.body.maxVelocity.setTo(Maxspeed, Maxspeed);
        player2.alive = true;
        player2.score = 0;
        player2.scoreString = ' ';

        // Set up the controls for player1
        keyboard = game.input.keyboard.createCursorKeys();
        fireKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // Set up the controls for player2
        AKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        WKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        DKey = game.input.keyboard.addKey(Phaser.Keyboard.D);

        //keeping score
        player.scoreString = 'Score 1: ';
        player.scoreText = game.add.text(20, 20, player.scoreString + player.score, {
            font: '30px Arial', fill: '#fff'
        });

        // Display the second player's score
        player2.scoreString = 'Score 2 : ';
        player2.scoreText = game.add.text(20, 50, player2.scoreString + player2.score, {
            font: '30px Arial',
            fill: '#fff',
        });
    },


    update: function () {
        //  Scroll the background
        starfield.tilePosition.y -= 2;

        //Setting Keyboard keys with velocity & not off map
        player.body.velocity.setTo(0, 0);
        player.body.collideWorldBounds = true;

        if (keyboard.left.isDown) {
            player.body.velocity.x = -300;
        } else if (keyboard.right.isDown) {
            player.body.velocity.x = 300;
        }

        //Setting Keyboard for shooting
        if (fireKey.isDown) {
            this.createBullet();
        }

        // Update the controls for the second player
        player2.body.velocity.setTo(0, 0);
        player2.body.collideWorldBounds = true;
        if (AKey.isDown) {
            player2.body.velocity.x = -300;
        } else if (DKey.isDown) {
            player2.body.velocity.x = 300;
        }

        if (WKey.isDown) {
            this.createBullet2();
        }

        //dropping eggs
        if (game.time.now > firingTimer) {
            this.dropEggs();
        }


        //screen Text
        stateText = game.add.text(game.world.centerX, game.world.centerY, ' ', {
            font: '84px Arial',
            fill: '#fff',
            boundsAlignH: "center",
            boundsAlignV: "middle"
        });
        stateText.anchor.setTo(0.5, 0.5);
        stateText.visible = false;

        //squeezing effect
        bank = player.body.velocity.x / Maxspeed;
        player.scaleX = 1 - Math.abs(bank) / 5;
        player.angle = bank * 10;

        // Update the collision functions to work with both players
        game.physics.arcade.overlap(bullets, chickens, this.collisionChickenBulletPlayer1, null, this);
        game.physics.arcade.overlap(bullets2, chickens, this.collisionChickenBulletPlayer2, null, this);
        game.physics.arcade.overlap(player, chickenLegs, this.collisionChickenLegs, null, this);
        game.physics.arcade.overlap(player2, chickenLegs, this.collisionChickenLegs, null, this);
        game.physics.arcade.overlap(player, eggs, this.collisionEggs, null, this);
        game.physics.arcade.overlap(player2, eggs, this.collisionEggs, null, this);
        game.physics.arcade.overlap(player, chickens, this.collisionChickenPlayer, null, this);
        game.physics.arcade.overlap(player2, chickens, this.collisionChickenPlayer, null, this);

        this.checkEndGame();
    },

    render: function () {
    },

    createBullet: function () {
        if (game.time.now > bulletTime) {
            var bullet = bullets.getFirstExists(false);

            if (bullet) {
                //  And fire it
                bullet.reset(player.x, player.y - 20);
                bullet.body.velocity.y = -400;
                bulletTime = game.time.now + 200;
            }
        }
    },
    createBullet2: function () {
        if (game.time.now > bulletTime) {
            var bullet = bullets2.getFirstExists(false);

            if (bullet) {
                //  And fire it
                bullet.reset(player2.x, player2.y - 20);
                bullet.body.velocity.y = -400;
                bulletTime = game.time.now + 200;
            }
        }
    },


    createChickens: function () {
        for (var y = 0; y < 3; y++) {
            for (var x = 0; x < 8; x++) {
                var chicken = chickens.create(x * 70, y * 50, 'enemy1');
                chicken.anchor.setTo(0.5, 0.5);
                chicken.animations.add('flap', [0, 1, 2, 3,], 5, true);
                chicken.play('flap');
                chicken.body.moves = false;
            }
        }
        chickens.x = 160;
        chickens.y = 100;
    },

    descend: function () {
        chickens.y += 10;
    },

    dropEggs: function () {
        livingChickens.length = 0;
        chickens.forEachAlive(function (chicken) {
            livingChickens.push(chicken);
        });

        if (livingChickens.length > 0) {
            var random = game.rnd.integerInRange(0, livingChickens.length - 1);
            var shooter = livingChickens[random];
            var egg = eggs.getFirstExists(false);
            egg.reset(shooter.body.x, shooter.body.y);
            game.physics.arcade.moveToObject(egg, player, 120);
            firingTimer = game.time.now + 2000;
        }
    },

    // when player shoots a chicken, remove chicken, increase player score and drop chicken leg
    collisionChickenBullet: function (player, bullet, chicken) {
        bullet.kill();
        chicken.kill();
        player.score += 10;
        player.scoreText.text = player.scoreString + player.score;
        //drop chicken leg
        chickenLegsCheck = chickenLegs.getFirstExists(false);
        if (!chickenLegsCheck == true) {
            console.log('empty');
        } else {
            var chickenLeg = chickenLegs.getFirstExists(false)
            chickenLeg.reset(chicken.body.x, chicken.body.y);
            chickenLeg.body.velocity.y = +120;
        }
    },
    collisionChickenBulletPlayer1: function (bullet, chicken) {
        this.collisionChickenBullet(player, bullet, chicken);
    },

    collisionChickenBulletPlayer2: function (bullet, chicken) {
        this.collisionChickenBullet(player2, bullet, chicken);
    },

    //when player hits chicken leg, increase score with 20 points
    collisionChickenLegs: function (player, chickenLeg) {
        chickenLeg.destroy();
        player.score += 20;
        player.scoreText.text = player.scoreString + player.score;
    },

    //when player hits egg
    collisionEggs: function (player, egg) {
        egg.kill();
        player.kill();
        player.alive = false;
        bullets.kill()
        this.gameOver();
    },

    //when player hits chicken
    collisionChickenPlayer: function (player, chicken) {
        chicken.kill();
        player.kill();
        bullets.kill();
        this.gameOver();
    },

    // the game ends if there are no chickens left or one player was hit by an egg or chicken
    checkEndGame: function () {
        if ((livingChickens.length < 1) || (player.alive === false || player2.alive === false)) {
            this.gameOver();
        }
    },

    gameOver: function () {
        var player1Score = player.score;
        var player2Score = player2.score;
        var gameOverText = "Game Over\n\nPlayer 1 score: " + player1Score + "\nPlayer 2 score: " + player2Score;
        if (player1Score > player2Score) {
            gameOverText += "\n\nPlayer 1 wins!";
        } else if (player2Score > player1Score) {
            gameOverText += "\n\nPlayer 2 wins!";
        } else {
            gameOverText += "\n\nIt's a tie!";
        }
        gameOverText += "\n\nTap to restart"
        stateText = game.add.text(game.world.centerX, game.world.centerY, gameOverText, {
            font: "30px Arial",
            fill: "#ffffff",
            align: "center"
        });
        stateText.anchor.setTo(0.5, 0.5);
        stateText.visible = true;
        game.paused = true;
        game.input.onDown.add(this.restartGame, this);
    },

    restartGame: function () {
        game.paused = false;
        player.score = 0;
        player2.score = 0;
        game.state.start("Game");
    },
};

