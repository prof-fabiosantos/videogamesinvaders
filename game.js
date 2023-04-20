var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var gameOver = false;

function preload ()
{
    this.load.image('player', 'player.png');
    this.load.image('comment', 'comment.png');
    this.load.image('bomb', 'bomb.png');

    // Carrega a imagem de fundo
    this.load.image('background', 'background.png');
    this.load.audio('bgmusic', 'background_music.mp3');
    this.load.audio('explosion', 'explosion.wav');
    this.load.audio('gameover', 'gameover.wav');

    gameOver = false;
}

function create ()
{
    // Adiciona a imagem de fundo
    this.add.image(400, 300, 'background');   
     
    // adiciona a música de fundo
    this.backgroundMusic = this.sound.add('bgmusic', { loop: true });
    this.backgroundMusic.play();

    // adiciona o jogador
    this.player = this.physics.add.sprite(100, 110, 'player');
    this.player.setCollideWorldBounds(true);
    this.cursors = this.input.keyboard.createCursorKeys();

    // adiciona os comentários
    this.comments = this.physics.add.group();
    this.time.addEvent({ delay: 1000, callback: generateComment, callbackScope: this, loop: true });

    // adiciona as bombas
    this.bombs = this.physics.add.group();
    this.input.keyboard.on('keydown-SPACE', fireBomb, this);

    // faz colisões entre o jogador e os comentários
    this.physics.add.collider(this.player, this.comments, hitComment, null, this);

    // faz colisões entre as bombas e os comentários
    this.physics.add.collider(this.bombs, this.comments, destroyComment, null, this);

    // define a pontuação inicial
    this.score = 0;
    this.scoreText = this.add.text(16, 16, 'Pontuação: 0', { fontSize: '32px', fill: '#000' });

    
}

function generateComment()
{
    if (!gameOver) {
        // cria um comentário aleatório
        var x = Phaser.Math.Between(0, 800);
        var comment = this.comments.create(x, 0, 'comment');

        // adiciona velocidade aos comentários
        comment.setVelocityY(Phaser.Math.Between(50, 200));
    }
}

function fireBomb()
{
    // cria uma bomba na posição do jogador
    var bomb = this.bombs.create(this.player.x, this.player.y, 'bomb');
    bomb.setVelocityY(-400);
}

function hitComment(player, comment)
{
    // finaliza o jogo se um comentário atingir o jogador
    endGame.call(this);
}

function destroyComment(bomb, comment)
{
    // aumenta a pontuação e atualiza o texto
    comment.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText('Pontuação: ' + this.score);

    // adiciona uma explosão ao destruir o comentário
    var explosion = this.sound.add('explosion');
    explosion.play();
}

function endGame() {
    // pausa o jogo e adiciona o texto de fim de jogo
    this.physics.pause();
    this.player.setTint(0xff0000);
    this.add.text(400, 100, 'Fim de Jogo!', { fontSize: '64px', fill: '#000' }).setOrigin(0.5);

    // adiciona a música de fundo
    this.gameoverMusic = this.sound.add('gameover', { loop: false });
    this.gameoverMusic.play();

    // remove a função de criação de comentários
    this.time.removeEvent(this.commentEvent);

    // desativa os comentários restantes e para a animação do jogador
    this.comments.children.each(function(comment) {
        comment.disableBody(true, true);
    });
    
    this.player.anims.stop();
    this.backgroundMusic.stop();
    
    // mostra a pontuação final e oferece a opção de reiniciar o jogo
    this.add.text(400, 200, 'Pontuação Final: ' + this.score, { fontSize: '32px', fill: '#000' }).setOrigin(0.5);
    this.add.text(400, 250, 'Pressione R para jogar novamente', { fontSize: '24px', fill: '#000' }).setOrigin(0.5);

    // define a ação para reiniciar o jogo
    this.input.keyboard.on('keydown-R', function() {
        this.scene.restart();
    }, this);
    gameOver = true;
}

function update() {
    // movimenta o jogador
    if (this.cursors.left.isDown)
    {
        this.player.setVelocityX(-160);
    }
    else if (this.cursors.right.isDown)
    {
        this.player.setVelocityX(160);
    }
    else
    {
        this.player.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.player.body.touching.down)
    {
        this.player.setVelocityY(-330);
    }

    // finaliza o jogo quando o jogador colide com um comentário
    this.physics.add.overlap(this.player, this.comments, function(player, comment) {
        comment.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('Pontuação: ' + this.score);
        
    }, null, this);

    if (this.player.body.touching.down && this.player.body.touching.up && this.player.body.touching.left && this.player.body.touching.right)
    {
        endGame.call(this);
    }
}
