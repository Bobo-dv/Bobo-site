// Initialize variables
let myX, myY, speed, gemX, gemY, gemType, ig, Collection = [], col, row, x, y, bombX, bombY, BombChance, BombCount, Wepon, rockX, rockY, bombXM, bombYM, ZombieX = [], ZombieY = [], iz, brZombies,health;

function init() {
    myX = 300;
    myY = 300;
    speed = 2;
    gemType = 0;
    bombX = -100;
    bombY = -100;
    BombCount = 0;
    Wepon = 1;
    rockX = -100;
    rockY = -100;
    bombXM = -100;
    bombYM = -100;
    gemX = -100;
    gemY = -100;
    health=400
    brZombies = 10;
    for (ig = 0; ig < 48; ig++) {
        Collection[ig] = false;
    }
    for (iz = 0; iz < brZombies; iz++) {
        ZombieX[iz] = randomInteger(800);
        ZombieY[iz] = randomInteger(600);
    }
}

function DrawBomb() {
    drawImage(bomb, bombX, bombY, 30, 30);
}

function DrawMap() {
    drawImage(backForest, 0, 0, 800, 600);
    drawImage(gem[gemType], gemX, gemY, 30, 30);
    drawImage(femaleAction, myX, myY, 60, 80);
    drawImage(powerupRed,0,0,health,20)
    drawImage(paddleGhost,0,0,400,20)
    for (iz = 0; iz < brZombies; iz++) {
        drawImage(zombie, ZombieX[iz], ZombieY[iz], 60, 80);
    }
    if (BombChance == 2) {
        drawImage(bomb, bombX, bombY, 30, 30);
        console.log("KK");
    }
    if (Wepon == 1) {
        drawImage(rock, rockX, rockY, 40, 40);
    }
    if (BombCount >= 1) {
        if (Wepon == 2) {
            drawImage(bomb, bombXM, bombYM, 40, 40);
            console.log('BB');
        }
    } else {
        Wepon = 1;
    }
}

function DrawBackpack() {
    drawImage(backForest, 0, 0, 800, 600);
    drawImage(paddleGhost, -100, -100, 1000, 1000);
    drawImage(slabBlue, 0, 0, 160, 200);
    drawImage(slabRed, 160, 0, 160, 200);
    for (ig = 0; ig < BombCount; ig++) {
        drawImage(bomb, 160, ig * 20, 20, 20);
    }
    for (ig = 0; ig < 48; ig++) {
        if (Collection[ig]) {
            col = ig % 8;
            row = Math.floor(ig / 8);
            x = col * 20;
            y = row * 20;
            drawImage(gem[ig], x, y, 20, 20);
        }
    }
}

function Movement() {
    if (isKeyPressed[87]) {
        rockX = myX;
        rockY = myY - 20;
        bombXM = myX;
        bombYM = myY - 20;
        myY -= speed;
    }
    if (isKeyPressed[83]) {
        myY += speed;
        rockX = myX;
        rockY = myY - 20;
        bombXM = myX;
        bombYM = myY - 20;
    }
    if (isKeyPressed[68]) {
        myX += speed;
        rockX = myX + 30;
        rockY = myY;
        bombXM = myX + 30;
        bombYM = myY;
    }
    if (isKeyPressed[65]) {
        myX -= speed;
        rockX = myX - 30;
        rockY = myY;
        bombXM = myX - 30;
        bombYM = myY;
    }
    if (isKeyPressed[16]) {
        speed = 4;
    }
    if (!isKeyPressed[16]) {
        speed = 2;
    }
    if (myY < -80) {
        myY = 600;
        Gems();
    }
    if (myY > 600) {
        myY = -80;
        Gems();
    }
    if (myX > 800) {
        myX = -60;
        Gems();
    }
    if (myX < -60) {
        myX = 800;
        Gems();
    }
}

function Gems() {
    gemX = randomInteger(800);
    gemY = randomInteger(600);
    gemType = randomInteger(48);
    console.log('Exe');
    BombChance = randomInteger(5);
    bombX = randomInteger(800);
    bombY = randomInteger(600);
    brZombies = randomInteger(20);
    for (iz = 0; iz < brZombies; iz++) {
        ZombieX[iz] = randomInteger(800);
        ZombieY[iz] = randomInteger(600);
    }
}

function update() {
    Movement();
    if (isKeyPressed[49]) {
        Wepon = 1;
    }
    if (isKeyPressed[50]) {
        Wepon = 2;
    }
    if (areColliding(gemX, gemY, 30, 30, myX, myY, 60, 80)) {
        Collection[gemType] = true;
        gemX = -100;
        gemY = -100;
    }
    if (areColliding(bombX, bombY, 30, 30, myX, myY, 60, 80)) {
        bombX = -100;
        bombY = -100;
        BombCount++;
    }
    for (iz = 0; iz < brZombies; iz++) {
        if(areColliding( ZombieX[iz], ZombieY[iz], 60, 80,rockX, rockY, 40, 40)){
            ZombieX[iz]=100000000000000000000000000000000000000000000000
        }
        if(areColliding( ZombieX[iz], ZombieY[iz], 60, 80, myX, myY, 60, 80)){
            health=health-1
        
        }
        let dx = myX - ZombieX[iz];
        let dy = myY - ZombieY[iz];
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 1) {
            ZombieX[iz] += dx * (2 / distance);
            ZombieY[iz] += dy * (2 / distance);
        }
    }
}

function draw() {
    if (!isKeyPressed[69]) {
        DrawMap();
    } else {
        DrawBackpack();
    }
}

function mouseup() {
    console.log("Mouse clicked at", mouseX, mouseY);
}

function keyup(key) {
    console.log("Pressed", key);
}

