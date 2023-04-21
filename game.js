
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
var currentPhase = 1;
var commentsDestroyed = 0;
var commentVelocity = 200;
var commentGoal = 10;
this.texts = null;

var text;


function preload ()
{
    this.load.image('player', 'player.png');
    this.load.image('comment', 'comment.png');
    this.load.image('comment2', 'comment2.png');
    this.load.image('comment3', 'comment3.png');
    this.load.image('comment4', 'comment4.png');
    this.load.image('comment5', 'comment5.png');
    this.load.image('comment6', 'comment6.png');
    this.load.image('comment7', 'comment7.png');
    this.load.image('comment8', 'comment8.png');    
    this.load.image('comment9', 'comment9.png');
    this.load.image('comment10', 'comment10.png');
    this.load.image('bomb', 'bomb.png');    
    this.load.image('background', 'background.png');
    this.load.audio('bgmusic', 'background_music.mp3');   
    this.load.audio('explosion', 'explosion.wav');
    this.load.audio('gameover', 'gameover.wav');
    

    gameOver = false;
}



function create ()
{    
    this.texts = this.add.group(); // aqui é definido o grupo

    // define a meta de comentários destruídos para a fase atual
    commentGoal = 10 * currentPhase;

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
    //displayText.call(this, 'Fase ' + currentPhase, '64px', 400, 100);
    text = this.add.text(400, 100, 'Fase ' + currentPhase, { fontSize: '64px', fill: '#000' }).setOrigin(0.5);
}

function displayText(text, fontSize, x, y) {
    this.texts.clear(true, true);   
    this.add.text(x, y, text, { fontSize: fontSize, fill: '#000' }).setOrigin(0.5).setDepth(1);
  }

function generateComment()
{
    if (!gameOver) {
        if(currentPhase == 1){
            // cria um comentário aleatório
            var x = Phaser.Math.Between(0, 800);
            var comment = this.comments.create(x, 0, 'comment');
            // adiciona velocidade aos comentários
            comment.setVelocityY(commentVelocity);
        }else if (currentPhase == 2){
            // cria um comentário aleatório
            var x = Phaser.Math.Between(0, 800);
            var comment = this.comments.create(x, 0, 'comment2');
            // adiciona velocidade aos comentários
            comment.setVelocityY(commentVelocity);
        }
        else if (currentPhase == 3){
            // cria um comentário aleatório
            var x = Phaser.Math.Between(0, 800);
            var comment = this.comments.create(x, 0, 'comment3');
            // adiciona velocidade aos comentários
            comment.setVelocityY(commentVelocity);
        }
        else if (currentPhase == 4){
            // cria um comentário aleatório
            var x = Phaser.Math.Between(0, 800);
            var comment = this.comments.create(x, 0, 'comment4');
            // adiciona velocidade aos comentários
            comment.setVelocityY(commentVelocity);
        }
        else if (currentPhase == 5){
            // cria um comentário aleatório
            var x = Phaser.Math.Between(0, 800);
            var comment = this.comments.create(x, 0, 'comment5');
            // adiciona velocidade aos comentários
            comment.setVelocityY(commentVelocity);
        }
        else if (currentPhase == 6){
            // cria um comentário aleatório
            var x = Phaser.Math.Between(0, 800);
            var comment = this.comments.create(x, 0, 'comment6');
            // adiciona velocidade aos comentários
            comment.setVelocityY(commentVelocity);
        }
        else if (currentPhase == 7){
            // cria um comentário aleatório
            var x = Phaser.Math.Between(0, 800);
            var comment = this.comments.create(x, 0, 'comment7');
            // adiciona velocidade aos comentários
            comment.setVelocityY(commentVelocity);
        }
        else if (currentPhase == 8){
            // cria um comentário aleatório
            var x = Phaser.Math.Between(0, 800);
            var comment = this.comments.create(x, 0, 'comment8');
            // adiciona velocidade aos comentários
            comment.setVelocityY(commentVelocity);
        }
        else if (currentPhase == 9){
            // cria um comentário aleatório
            var x = Phaser.Math.Between(0, 800);
            var comment = this.comments.create(x, 0, 'comment9');
            // adiciona velocidade aos comentários
            comment.setVelocityY(commentVelocity);
        }
        else if (currentPhase == 10){
            // cria um comentário aleatório
            var x = Phaser.Math.Between(0, 800);
            var comment = this.comments.create(x, 0, 'comment10');
            // adiciona velocidade aos comentários
            comment.setVelocityY(commentVelocity);
        }
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

    // aumenta o contador de comentários destruídos
    commentsDestroyed++;

    // se o jogador atingir a meta da fase atual, avança para a próxima fase
    if (commentsDestroyed >= commentGoal) {
        currentPhase++;
        commentsDestroyed = 0;
        commentVelocity += 50;
        commentGoal = 10 * currentPhase;

        this.texts.clear(true, true);
        text.destroy();
        //displayText.call(this, 'Fase ' + currentPhase, '64px', 400, 100);

        text = this.add.text(400, 100, 'Fase ' + currentPhase, { fontSize: '64px', fill: '#000' }).setOrigin(0.5);
        this.time.addEvent({ delay: 3000, callback: function() {
            this.add.text(400, 100, '', { fontSize: '64px', fill: '#000' }).setOrigin(0.5);
        }, callbackScope: this, loop: false });
    }

    // adiciona uma explosão ao destruir o comentário
    var explosion = this.sound.add('explosion');
    explosion.play();
}


function endGame() {
    
    
    // se o jogador alcançar a última fase, exibe uma mensagem de vitória
    if (currentPhase >= 10) {
        this.add.text(400, 450, 'Parabéns, você foi o campeão!', { fontSize: '64px', fill: '#000' }).setOrigin(0.5);
    }

    // pausa o jogo e adiciona o texto de fim de jogo
    this.physics.pause();
    this.player.setTint(0xff0000);
    this.add.text(400, 350, "                     ", { fontSize: '64px', fill: '#000' }).setOrigin(0.5);
    this.add.text(400, 350, 'Fim de Jogo!', { fontSize: '64px', fill: '#000' }).setOrigin(0.5);

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
        currentPhase = 1;
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

    // movimenta os comentários e remove-os quando saem da tela
    this.comments.children.each(function(comment) {
        if (comment.y > 600) {
            comment.disableBody(true, true);
        }
        
    });

}
