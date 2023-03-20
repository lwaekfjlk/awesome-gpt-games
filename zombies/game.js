// game.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let player;
let bullets;
let keys;
let level = 1;
let zombies = [];
let barricades;
let playerHealth = 100;

// Initialize game
function init() {
    player = new Player(400, 300);
    bullets = [];
    barricades = generateRandomBarricades(3);
    keys = {
        w: false,
        a: false,
        s: false,
        d: false,
        q: false,
        e: false,
    };
    
    addEventListeners();
    gameLoop = setInterval(update, 1000 / 60); // 60 FPS
    spawnZombies(level * 10);
}

function generateRandomBarricades(count) {
    const barricades = [];
    for (let i = 0; i < count; i++) {
        const x = Math.random() * (canvas.width - 50);
        const y = Math.random() * (canvas.height - 50);
        const width = 50;
        const height = 50;
        const health = 100;
        barricades.push(new Barricade(x, y, width, height, health));
    }
    return barricades;
}


function checkZombiesCleared() {
    if (zombies.length === 0) {
        level++;
        spawnZombies(level*10); // You can adjust the number of zombies to spawn here
    }
}

// Main game loop
function update() {
    handleInput();
    updateGameObjects();
    checkCollisions();
    checkZombiesCleared();
    draw();
}

function spawnZombies(zombieCount) {
    for (let i = 0; i < zombieCount; i++) {
        let x, y;
        const side = Math.floor(Math.random() * 4); // Randomly choose a side (0: top, 1: right, 2: bottom, 3: left)

        switch (side) {
            case 0: // Top
                x = Math.random() * canvas.width;
                y = -20;
                break;
            case 1: // Right
                x = canvas.width + 20;
                y = Math.random() * canvas.height;
                break;
            case 2: // Bottom
                x = Math.random() * canvas.width;
                y = canvas.height + 20;
                break;
            case 3: // Left
                x = -20;
                y = Math.random() * canvas.height;
                break;
        }

        const type = Math.random() > 0.8 ? 'red' : 'gray';
        zombies.push(new Zombie(x, y, type));
    }
}



function handleInput() {
    const oldX = player.x;
    const oldY = player.y;

    if (keys.w) {
        player.y -= player.speed;
        player.lastDirection = { x: 0, y: -1 };
    }
    if (keys.a) {
        player.x -= player.speed;
        player.lastDirection = { x: -1, y: 0 };
    }
    if (keys.s) {
        player.y += player.speed;
        player.lastDirection = { x: 0, y: 1 };
    }
    if (keys.d) {
        player.x += player.speed;
        player.lastDirection = { x: 1, y: 0 };
    }

    if (isCollidingWithBarricades(player)) {
        player.x = oldX;
        player.y = oldY;
    }

    if (keys.q) {
        player.switchWeapon(-1);
    }
    if (keys.e) {
        player.switchWeapon(1);
    }
}



function updateGameObjects() {
    bullets.forEach((bullet, index) => {
        bullet.update();
        if (bullet.isOutOfBounds()) {
            bullets.splice(index, 1);
        }
    });

    zombies.forEach((zombie) => {
    const oldX = zombie.x;
    const oldY = zombie.y;
    zombie.update(player.x, player.y);
    const collidedBarricade = getCollidingBarricade(zombie);
    if (collidedBarricade) {
        if (oldX + zombie.width <= collidedBarricade.x || oldX >= collidedBarricade.x + collidedBarricade.width) {
            zombie.x = oldX;
        }
        if (oldY + zombie.height <= collidedBarricade.y || oldY >= collidedBarricade.y + collidedBarricade.height) {
            zombie.y = oldY;
        }
    }
    });

}

function getCollidingBarricade(obj) {
    for (let i = 0; i < barricades.length; i++) {
        if (isCollidingRect(obj, barricades[i])) {
            return barricades[i];
        }
    }
    return null;
}


function checkCollisions() {
    bullets.forEach((bullet, bulletIndex) => {
        zombies.forEach((zombie, zombieIndex) => {
            if (isCollidingRect(bullet, zombie)) {
                bullets.splice(bulletIndex, 1);
                zombies.splice(zombieIndex, 1);
            }
        });
    });

    zombies.forEach((zombie) => {
        if (isCollidingRect(player, zombie)) {
            if (zombie.type === 'red') {
                playerHealth -= 2;
            } else {
                playerHealth -= 1;
            }
            if (playerHealth <= 0) {
                gameOver();
            }
        }
    });

    // Check if all zombies are cleared
    if (zombies.length === 0) {
        nextLevel();
    }
}
function checkCollisions() {
    bullets.forEach((bullet, bulletIndex) => {
        zombies.forEach((zombie, zombieIndex) => {
            if (isCollidingRect(bullet, zombie)) {
                bullets.splice(bulletIndex, 1);
                zombie.health -= 10; // Decrease zombie health by 1 (or any other value you prefer)
                if (zombie.health <= 0) {
                    zombies.splice(zombieIndex, 1);
                }
            }
        });
    });

    zombies.forEach((zombie) => {
        if (isCollidingRect(player, zombie)) {
            if (zombie.type === 'red') {
                playerHealth -= 2;
            } else {
                playerHealth -= 1;
            }
            if (playerHealth <= 0) {
                gameOver();
            }
        }
    });

    bullets.forEach((bullet, bulletIndex) => {
        barricades.forEach((barricade, barricadeIndex) => {
            if (isCollidingRect(bullet, barricade)) {
                bullets.splice(bulletIndex, 1);
                barricade.health -= 10; // Decrease barricade health by 10 (or any other value you prefer)
                if (barricade.health <= 0) {
                    barricades.splice(barricadeIndex, 1);
                }
            }
        });
    });

}


function isCollidingRect(obj1, obj2) {
    const isColliding = (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
    );
    if (isColliding) {
        console.log('Collision detected');
    }
    return isColliding;
}

function isCollidingWithBarricades(obj) {
    for (let i = 0; i < barricades.length; i++) {
        if (isCollidingRect(obj, barricades[i])) {
            return true;
        }
    }
    return false;
}


function gameOver() {
    clearInterval(gameLoop);
    console.log('Game Over');
    // You can implement a proper game over screen here
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw();
    bullets.forEach((bullet) => bullet.draw());
    zombies.forEach((zombie) => zombie.draw());
    barricades.forEach((barricade) => barricade.draw());

}

function addEventListeners() {
    window.addEventListener('keydown', (e) => {
        if (['w', 'a', 's', 'd', 'q', 'e'].includes(e.key.toLowerCase())) {
            keys[e.key.toLowerCase()] = true;
        }
    });

    window.addEventListener('keyup', (e) => {
        if (['w', 'a', 's', 'd', 'q', 'e'].includes(e.key.toLowerCase())) {
            keys[e.key.toLowerCase()] = false;
        }
    });

    window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        const newBullets = player.shoot();
        bullets.push(...newBullets);
        }
    });

}

// Add weapon classes here

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        this.speed = 5;
        this.lastDirection = { x: 0, y: 0 };
        this.weapons = [
            new Weapon1(),
            new Weapon2(),
            new Weapon3(),
            new Weapon4(),
            new Weapon5(),
        ];
        this.currentWeaponIndex = 0;
    }

    draw() {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Draw player health
        ctx.fillStyle = 'black';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(playerHealth, this.x + this.width / 2, this.y + this.height / 2);
    }


    shoot() {
    const currentWeapon = this.weapons[this.currentWeaponIndex];
    const newBullets = currentWeapon.shoot(this);
    return newBullets;
    }


    switchWeapon(direction) {
        this.currentWeaponIndex += direction;
        if (this.currentWeaponIndex < 0) {
            this.currentWeaponIndex = this.weapons.length - 1;
        } else if (this.currentWeaponIndex >= this.weapons.length) {
            this.currentWeaponIndex = 0;
        }
    }
}

function movePlayer() {
    // ...
    if (keysPressed['ArrowUp'] && !isCollidingWithBarricades({ ...player, y: player.y - player.speed })) {
        player.y -= player.speed;
    }
    if (keysPressed['ArrowDown'] && !isCollidingWithBarricades({ ...player, y: player.y + player.speed })) {
        player.y += player.speed;
    }
    if (keysPressed['ArrowLeft'] && !isCollidingWithBarricades({ ...player, x: player.x - player.speed })) {
        player.x -= player.speed;
    }
    if (keysPressed['ArrowRight'] && !isCollidingWithBarricades({ ...player, x: player.x + player.speed })) {
        player.x += player.speed;
    }
}


class Barricade {
    constructor(x, y, width, height, health) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.health = health;
    }

    draw() {
        ctx.fillStyle = 'brown';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}


// Bullet class
class Bullet {
    constructor(x, y, size, speed, direction, lifetime = Infinity) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.width = size;
        this.height = size;
        this.speed = speed;
        this.direction = direction;
        this.lifetime = lifetime;
    }

    update() {
        this.x += this.speed * this.direction.x;
        this.y += this.speed * this.direction.y;
        this.lifetime--;
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    isOutOfBounds() {
        return this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height || this.lifetime <= 0;
    }
}

// Weapon classes
class Weapon1 {
    constructor() {
        // Implement weapon-specific properties
        this.bulletSpeed = 7;
        this.bulletSize = 3;
    }

    shoot(player) {
        // Implement weapon-specific shooting method
        const bulletX = player.x + player.width / 2 - this.bulletSize / 2;
        const bulletY = player.y + player.height / 2 - this.bulletSize / 2;
        const bullet = new Bullet(bulletX, bulletY, this.bulletSize, this.bulletSpeed, player.lastDirection);
        return [bullet];
    }
}

class Weapon2 {
    constructor() {
        // Implement weapon-specific properties
        this.bulletSpeed = 10;
        this.bulletSize = 5;
    }

    shoot(player) {
        // Implement weapon-specific shooting method
        const bulletX = player.x + player.width / 2 - this.bulletSize / 2;
        const bulletY = player.y + player.height / 2 - this.bulletSize / 2;
        const bullet = new Bullet(bulletX, bulletY, this.bulletSize, this.bulletSpeed, player.lastDirection);
        return [bullet];
    }
}

class Weapon3 {
    constructor() {
        // Implement weapon-specific properties
        this.bulletSpeed = 8;
        this.bulletSize = 4;
        this.spreadAngle = 15;
    }

    shoot(player) {
        // Implement weapon-specific shooting method
        const bulletX = player.x + player.width / 2 - this.bulletSize / 2;
        const bulletY = player.y + player.height / 2 - this.bulletSize / 2;
        const bullet1 = new Bullet(bulletX, bulletY, this.bulletSize, this.bulletSpeed, player.lastDirection);
        const bullet2 = new Bullet(bulletX, bulletY, this.bulletSize, this.bulletSpeed, {
            x: player.lastDirection.x * Math.cos(this.spreadAngle) - player.lastDirection.y * Math.sin(this.spreadAngle),
            y: player.lastDirection.x * Math.sin(this.spreadAngle) + player.lastDirection.y * Math.cos(this.spreadAngle)
        });
        const bullet3 = new Bullet(bulletX, bulletY, this.bulletSize, this.bulletSpeed, {
            x: player.lastDirection.x * Math.cos(-this.spreadAngle) - player.lastDirection.y * Math.sin(-this.spreadAngle),
            y: player.lastDirection.x * Math.sin(-this.spreadAngle) + player.lastDirection.y * Math.cos(-this.spreadAngle)
        });
        return [bullet1, bullet2, bullet3];
    }
}

class Weapon4 {
    constructor() {
        // Implement weapon-specific properties
        this.bulletSpeed = 12;
        this.bulletSize = 2;
        this.bulletCount = 5;
    }

    shoot(player) {
        // Implement weapon-specific shooting method
        const bullets = [];
        const bulletX = player.x + player.width / 2 - this.bulletSize / 2;
        const bulletY = player.y + player.height / 2 - this.bulletSize / 2;
        for (let i = 0; i < this.bulletCount; i++) {
            const angle = (i * 360 / this.bulletCount) * (Math.PI / 180);
            const direction = {
                x: Math.cos(angle),
                y: Math.sin(angle)
            };
            const bullet = new Bullet(bulletX, bulletY, this.bulletSize, this.bulletSpeed, direction);
            bullets.push(bullet);
        }
        return bullets;
    }
}

class Weapon5 {
    constructor() {
        // Implement weapon-specific properties
        this.bulletSpeed = 15;
        this.bulletSize = 6;
        this.bulletLifetime = 30;
    }

    shoot(player) {
        // Implement weapon-specific shooting method
        const bulletX = player.x + player.width / 2 - this.bulletSize / 2;
        const bulletY = player.y + player.height / 2 - this.bulletSize / 2;
        const bullet = new Bullet(bulletX, bulletY, this.bulletSize, this.bulletSpeed, player.lastDirection, this.bulletLifetime);
        return [bullet];
    }
}

class Zombie {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        this.type = type;
        this.speed = type === 'red' ? 2 : 1;
        this.radius = Math.sqrt(this.width * this.width + this.height * this.height) / 2;
        this.health = type === 'red' ? 100 : 20;
    }

    update(targetX, targetY) {
        const dx = targetX - this.x;
        const dy = targetY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        this.x += (dx / distance) * this.speed;
        this.y += (dy / distance) * this.speed;
    }

    draw() {
        ctx.fillStyle = this.type === 'red' ? 'red' : 'gray';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function moveZombies() {
    zombies.forEach((zombie) => {
        // ...
        if (!isCollidingWithBarricades({ ...zombie, x: newX, y: newY })) {
            zombie.x = newX;
            zombie.y = newY;
        }
    });
}


// Continue the game after a pause
function pauseGame() {
    clearInterval(gameLoop);
}

function continueGame() {
    gameLoop = setInterval(update, 1000 / 60); // 60 FPS
}

function startGame() {
    init(); // Initialize game objects
    setInterval(gameLoop, 1000 / 60); // Start the game loop
}

startGame(); // Call the startGame function to begin the game

console.log(isCollidingRect(player, barricades[0])); // This should print 'true' or 'false' in the console
console.log(isCollidingWithBarricades({ ...player, y: player.y - player.speed })); // This should print 'true' or 'false' in the console
console.log('movePlayer called'); // Add this line in the movePlayer function
console.log('moveZombies called'); // Add this line in the moveZombies function
