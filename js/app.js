const levelCounter = document.querySelector(".levels");
const leftLives = document.querySelector(".lives");
const bestLife = document.querySelector(".bestLevel");
let levels = 1;
let lives = 3;

// Enemies our player must avoid
let Enemy = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png'; //shows a bug image on screen
};

Enemy.prototype.update = function (dt) {
    this.x += this.speed * levels * dt; // allow bugs to move at a particular speed with respect to level
    if (this.x > 500) {
        this.x = -70;
    }
    //the lower if statement sets position of player to default when it collides with enemies
    if (player.x >= this.x - 75 && player.x <= this.x + 75 && player.y >= this.y - 60 && player.y <= this.y + 60) {
        player.x = 200;
        player.y = 400;
        decreasingLives();
        if (leftLives.textContent == 0) {
            //swal displays an animated alert when player collides with enemy bug for three times 
            swal({
                    title: "SORRY!",
                    text: "You Lost!",
                    icon: "warning",
                })
                .then((willDelete) => {
                    bestLife.textContent = levels;
                    levels = 1;
                    levelCounter.textContent = levels;
                    lives = 3;
                    leftLives.textContent = 3;
                });
        }
    }
};

// Draws the enemy "bug" on the screen
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player function sets specific position of player
const Player = function () {
    this.x = 200;
    this.y = 400;
    this.sprite = 'images/char-cat-girl.png';
}

/*update function sets player position to default when player
reaches water without colliding with enemies with an alert 
displaying "you won" message.*/
Player.prototype.update = function () {
    if (this.y < 60) {
        swal("Good job!", "You Won!", "success"); //shows a sweet(animated) alert when game is won
        increaseLevels(); //increases number of levels
        lives = 3;
        leftLives.textContent = 3;
        this.x = 200;
        this.y = 400;
    }
}


//draws player image on the screen
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//handleInput function allows user to move player in by 
//one block each time using arrow keys in all four directions
Player.prototype.handleInput = function (direction) {
    if (direction == 'left' && this.x > 50) {
        this.x -= 100;
    } else if (direction == 'up' && this.y > 50) {
        this.y -= 85;
    } else if (direction == 'right' && this.x < 400) {
        this.x += 100;
    } else if (direction == 'down' && this.y < 400) {
        this.y += 85;
    }
};

//instantiated enemy objects
const enemy1 = new Enemy(0, 225, 50);
const enemy2 = new Enemy(-50, 140, 70);
const enemy3 = new Enemy(-100, 60, 90);
const enemy4 = new Enemy(-800, 225, 50);
const enemy5 = new Enemy(-400, 140, 30);

const allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];

const player = new Player(50, 50); // player postioned using x and y-axis

//increaseLevels function increases level by one every time player reaches
//water without colliding with enemies
function increaseLevels() {
    levels++;
    levelCounter.textContent = levels;
}

//decreasingLives function decreases number of lives by 1 each time 
// from provided 3 lives when player collides with enemy 'bug'
function decreasingLives() {
    lives--;
    leftLives.textContent = lives;
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    const sAlert = document.querySelector(".swal-overlay--show-modal");
    if (!sAlert) {
        player.handleInput(allowedKeys[e.keyCode]); //allows player to move when alert is not displayed
    }
});