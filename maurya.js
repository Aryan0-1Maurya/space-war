/* 

    #############################################################
      
          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

(   By ~Aryan Maurya Mr.perfect https://amsrportfolio.netlify.app  )

          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

    #############################################################

*/


//// functions //////

const id = (i) => {
    return document.getElementById(i);
}

const restart = () => {
    id('restart')
    .addEventListener('click', () => {
        //initPlayerInDb();
        id('gm').style.display = 'none';
        world.myPlayer.health = 40;
        world.myPlayer.x = random(0, width - 50);
        world.myPlayer.y = random(0, height - 50);
        world.players = [];
        world.bullets = [];
        world.enemyBullets = [];
        score = 0;
        
        //once = true;
    });
}

const over = () => {
    id('gm').style.display = 'flex';
    id('score').innerText = score;
}

const __splice__ = (img, n, w, h) => {
    const frames = [];
    for (let i = 0; i < n; i++) {
        const span = img.get(i * w, 0, w, h);
        frames.push(span);
    }
    return frames;
}

const generateFrames = () => {
    //world.frames.explosion = __splice__(
    //world.spritesheets.explosion.sprite, 16,
    //world.spritesheets.explosion.w,
    //world.spritesheets.explosion.h
    //); // explosion frames;
    world.frames.bullet.fire = __splice__(
    world.spritesheets.bullet.fire, 1,
    64, 64
    ); // bullet - fire frames
    world.frames.bullet.explosion = __splice__(
    world.spritesheets.bullet.explosion, 8,
    world.spritesheets.bullet.w,
    world.spritesheets.bullet.h
    ); // bullet - explosion frames
}

const addBullet = (x, y, a, d, arr) => {
    
    const bullet = new Bullet(uuid(), x, y, a, d);
    arr.push(bullet);
    
    //const bid = uuid();
    //const ref = db.ref('/bullets/' + uid + '/' + bid);
    //const data = {
        //id: bid,
        //x: x,
        //y: y,
        //a: a,
        //d: d
    //};
    //ref.set(data);
    //
}

const getBullets = () => {
    //const ref = db.ref('/bullets/' + uid);
    //ref.on('child_added', snap => {
        //const val = snap.val();
        //const bullet = new Bullet(val.id, val.x, val.y, val.a, val.d);
        //const player = world.players.find(p => { return p.id == uid });
        //player.bullets.push(bullet);
        //world.bullets.push(bullet);
    //});
}

const delBullet = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        const bul = arr[i];
        const lost = bul.x > width + 50 || bul.x < -bul.w || bul.y > height + 50 || bul.y < -bul.h || bul.scaler == 0;
        if (lost) {
            //const ref = db.ref('/bullets/' + uid + '/' + bul.id);
            //ref.set(null);
            arr.splice(i, 1);
        };
    }
}

const detectCollision = (o1, o2) => {
    const distance = Math.sqrt(Math.pow((o1.x - o2.x), 2) + Math.pow((o1.y - o2.y) - 10, 2)); // distance between two players _ √(x1 -x)^2 + (y1 - y)^2
    const colls = distance < o1.w - 20 && distance < o1.h - 20; // if the player width and height is less than the distance between them, then they are colliding
    if (colls) return true; // if collids return true
    return false; // otherwise return false
}

const makeToast = (text, delay) => {
    let body = document.getElementsByTagName('body')[0];
    let div = document.createElement('div');
    div.classList.add('toast');
    div.innerText = text;
    body.appendChild(div);
    
    setTimeout(() => {
        div.style.bottom = '0';
        
        setTimeout(() => {
            div.style.bottom = '-50px';
        }, 2000);
        
        
    }, delay);
}

const collisionWithMainPlayer = () => {
    for (let i = 0; i < world.enemyBullets.length; i++) {
        const lapped = detectCollision(world.myPlayer, world.enemyBullets[i]);
        if (lapped) {
            world.enemyBullets[i].scaler = 0;
            world.enemyBullets[i].frames = world.frames.bullet.explosion;
            world.enemyBullets[i].h = 35;
            world.enemyBullets[i].w = 35;
            setTimeout(() => {
                world.enemyBullets
                .splice(i, 1);
                playerHitted(world.myPlayer);
            }, 100);
        }
    }
}

const hitted = (bs, ps) => {
    for (let i = 0; i < ps.length; i++) {
        for (let j = 0; j < bs.length; j++) {
            const lapped = detectCollision(ps[i], bs[j]);
            if (lapped && ps[i].id != uid) { 
                bs[j].scaler = 0;
                bs[j].frames = world.frames.bullet.explosion;
                bs[j].h = 35;
                bs[j].w = 35;
                setTimeout(() => {
                    bs.splice(j, 1);
                    playerHitted(ps[i]);
                }, 100);
            }
        }
    }
}

const playerHitted = (p) => {
     if (p) { 
         //const ref = db.ref('/players/' + p.id);
         p.health--; 
         //if (p.health > 0) ref.update({health: p.health});
     }
}

const checkGameOver = (ps) => {
    for (let i = 0; i < 
    world.players.length; i++) {
        const p = world.players[i];
        const noHealth = p.health <= 1;
        if (noHealth) {
            score++;
            world.players.splice(i, 1);
            
            //const ref = db.ref('/players/' + p.id);
            //if (p.id == uid) over();
            //ref.set(null, err => {
                //if (!err) {
                    //world.players
                    //.splice(i, 1);
                //}
            //});
        }
    }
/* 

    #############################################################
      
          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

(   By ~Aryan Maurya Mr.perfect https://amsrportfolio.netlify.app  )

          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

    #############################################################

*/

    
    /*if (world.myPlayer && world.myPlayer.health <= 1) {
        world.over();
        //once = false;
    }*/
    /*if (world.myPlayer) {
    const ref = db.ref('/players/' + uid);
    ref.once('value').then(snap => {
        if (snap.val().health < 0) {
            world.over();
        }
    });
    }*/
    

    if (world.myPlayer.health <= 1) {
        world.over();
    }
    
}

const enemyFromLeft = () => {
    const enemy = new Player(uuid(), '', -50, random(0, height - 50), {x: 1, y: 0}, world.spritesheets.enemy);
    enemy.angle = - 90 * (Math.PI / 180);
    enemy.dir = {dx: 1, dy: 0};
    world.players.push(enemy);
}

const enemyFromRight = () => {
    const enemy = new Player(uuid(), '', width + 30, random(0, height - 50), {x: -1, y: 0}, world.spritesheets.enemy);
    enemy.angle = 90 * (Math.PI / 180);
    enemy.dir = {dx: -1, dy: 0};
    world.players.push(enemy);
}

const enemyFromTop = () => {
    const enemy = new Player(uuid(), '', random(0, width - 50), -50, {x: 0, y: 1}, world.spritesheets.enemy);
    enemy.angle = 0 * (Math.PI / 180);
    enemy.dir = {dx: 0, dy: 1};
    world.players.push(enemy);
}

const enemyFromBottom = () => {
    const enemy = new Player(uuid(), '', random(0, width - 50), height + 30, {x: 0, y: -1}, world.spritesheets.enemy);
    enemy.angle = 180 * (Math.PI / 180);
    enemy.dir = {dx: 0, dy: -1};
    world.players.push(enemy);
}

////////// Firebase ////////
const initPlayers = () => {
    const player1 = new Player(uuid(), random(0, width - 50), random(0, height - 50));
    const player2 = new Player(uid, random(0, width), random(0, height - 50));
    world.players.push(player1);
    world.players.push(player2);
}

const initFirebase = () => {
    
}

const initPlayerInDb = () => {
    const ref = db.ref('/players/' + uid);
    const isOnline = db.ref('.info/connected');
    const data = {
        id: uid,
        name: prompt(''),
        x: random(0, width - 50),
        y: random(0, height - 50),
        health: 40,
        angle: 0
    };
    isOnline.on('value', snap => {
        if (!snap.val) return;
        ref.onDisconnect().set(null)
        .then(() => {
            ref.set(data, dataSubmitted);
        }).catch(() => {return;});
    });
}

const getPlayers = () => {
    const ref = db.ref('/players/');
    ref.on('child_added', snap => {
        const val = snap.val();
        const player = new Player(val.id, val.name, val.x, val.y);
        const mine = val.id == uid;
        //if (mine) world.myPlayer = player;
        world.players.push(player);
    });
}

const playerLost = () => {
    const ref = db.ref('/players/');
    ref.on('child_removed', snap => {
        const val = snap.val();
        for (let i = 0; i < world.players.length; i++) {
            if (world
            .players[i].id == val.id) {
             world.players.splice(i, 1);
             const ref = db.ref('/bullets/' + val.id);
             ref.set(null);
            }
            if (val.id == uid) {
                over();
            }
            
        }
        const toRemove = db.ref('/players/' + val.id);
        toRemove.set(null);
    });
}

const dataSubmitted = (err) => {
    if (!err) {
        //console.log('Data submitted');
    }
}

//// Variables ////
const uid = uuid(); // generate an unique id for every players; We will find our player using this id.
//console.log(uid);
const height = innerHeight; // window height
const width = innerWidth; // window width
const {PI: π, sin, cos} = Math; // π 3.1415...lol
//const db = firebase.database();
const world = {
    spritesheets: {
    player: null, bg: null, enemy: null,
    explosion: {sprite: null, h: 64, w: 64},
    bullet: {fire: null, explosion: null, 
    w: 64, h: 64}}, // spritesheets,
    frames: {
    bullet: {fire: [], explosion: []},
    explosion: []}, // frames
    players: [], // all players
    myPlayer: null,
    bullets: [],
    enemyBullets: [],
    over: over // game over
};
let player;
let vector = {dx: 0, dy: 0};
let direction = {x: null, y: null};
let angle = {Π1: null, Π2: null};
let bg1, bg2;
let score = 0;
let once = true;

///// Classes ///////

class /* main user class */ Player {

    /* constructor fp */ constructor(id, name, x, y, vel, img)
    {
        this.id = id;
        this.name = name;
        this.x = x;
        this.y = y;
        this.h = 50;
        this.w = 50;
        this.img = img;
        this.scaler = 4.5;
        this.angle = 0;
        this.dir = null;
        this.saveAngle = 0;
        this.health = 40;
        this.vecX = 0;
        this.vecY = 0;
        this.bullets = [];
        this.vel = vel;
    }
    /* init player */ init() {
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        image(this.img, 0, 0, this.w, this.h);
        pop();
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        this.saveAngle = this.angle;
        fill('#fff');
        text(this.name, -this.w*0.2, -this.h*0.6);
        noFill();
        stroke('#fff');
        rect(-this.w/2.5, -this.h*0.5, 40, 5);
        fill('green');
        //noStroke();
        rect(-this.w/2.5, -this.h*0.5, this.health, 5);
        pop();
        //fill("#fff");
        //text(world.bullets.length, 10, 10);
        
    }
    
    updateByDb() {
        db.ref('/players/' + this.id)
        .once('value').then(snap => {
            const val = snap.val();
            const you = this.id == uid;
            //if (!you) {
                this.health = val.health;
                this.x = val.x;
                this.y = val.y;
                this.angle = val.angle;
            //}
        });
    }
    
    
    updateEnemy(vec) {
    
        if (frameCount % 10 == 0) addBullet(this.x, this.y, this.angle, this.dir, world.enemyBullets);
        this.x += this.vel.x;
        this.y += this.vel.y;
    
    }
    
    /* update player */ update() {
        
        ///// health control ////
        if (this.health > 40) {
            this.health = 40;
        }
    }
    /* detect collision */ collidedWith(p) {
        //const {x, y, w, h} = p;
        const distance = Math.sqrt(Math.pow((this.x - p.x), 2) + Math.pow((this.y - p.y), 2)); // distance between two players _ √(x1 -x)^2 + (y1 - y)^2
        const colls = distance < this.w && distance < this.h; // if the player width and height is less than the distance between them, then they are colliding
        if (colls) return true; // if collids return true
        return false; // otherwise return false
    }
    
}

class Bullet {
    constructor(id, x, y, angle, dir) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.frames = world.frames.bullet.fire;
        this.h = 5;
        this.w = 5;
        this.sMap = 0;
        this.sSpeed = 0.5;
        this.scaler = 5;
        this.angle = angle;
        this.dir = dir;
    }
    display() {
        let index = floor(this.sMap) % this.frames.length;
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        image(this.frames[index], 0, 0, this.w, this.h);
        pop();
        
    }
    
    update() {
        this.sMap += this.sSpeed;
        this.x += this.dir.dx * this.scaler;
        this.y += this.dir.dy * this.scaler;
        
        //const ref = db.ref('/bullets/' + uid + '/' + this.id);
        //ref.update({
            //x: this.x,
            //y: this.y
        //});
    }
}

class /* Team Class */ Team {
    condtructor(id, players) {
        this.id = id;
        this.players = players;
    }
}

class Bg {
    constructor(x, y, w, h, img){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = img;
        this.scaler = 2.5;
    }
    display(){
        image(this.img, this.x, this.y, this.w, this.h);
    }
    update(vec){
        this.x -= vec.dx * this.scaler;
        if (this.x > width * 2) this.x = - width*2;
        
        if (this.x < - width*2) this.x = width*2;
        //this.y -= vec.dy * this.scaler;
    }
}


const updatePlayer = (vec) => {
    //const myPlayer = world.players.find(
    //p => {
        //return p.id == uid;
    //}); 
    //if (myPlayer) {
    
    world.myPlayer.x += vec.dx*world.myPlayer.scaler;
    world.myPlayer.y += vec.dy*world.myPlayer.scaler;
    world.myPlayer.angle += vec.dx*0.1;
    world.myPlayer.angle += vec.dy*0.13;
    
    const allowed = Math.abs(vec.dx) > 0 && Math.abs(vec.dy) > 0;
    
    const dir = {dx: vec.dx, dy: vec.dy};
    
    if (allowed) addBullet(world.myPlayer.x, world.myPlayer.y, world.myPlayer.angle, dir, world.bullets);
    
    //const ref = db.ref('/players/' + uid);
    //ref.update({
        //x: myPlayer.x,
        //y: myPlayer.y,
        //angle: myPlayer.angle
    //}); }
}

/* create joyatick */ create_joystick(
(data) => {

    vector.dx = data.dx; vector.dy = data.dy;
    
    updatePlayer(data);
    
    
    //const myPlayer = world.players.find(p => { return p.id == uid });
    //const allowed = Math.abs(data.dx) > 0 && Math.abs(data.dy) > 0 && myPlayer;
    //if(allowed) addBullet(myPlayer.x, myPlayer.y, myPlayer.angle, {dx: data.dx, dy: data.dy});
    
}, {radius: 24, bg: 'url("https://i.ibb.co/GWxsbwN/shield2.png")'}, {radius: 40, bg: 'url("https://i.ibb.co/GWxsbwN/shield2.png")'}
);

/* preload function */ function preload() {
    // load all game assests..
    world.spritesheets.player = loadImage('https://i.ibb.co/949JRNh/ship-sprite-png-6-transparent.png');
    world.spritesheets.enemy = loadImage('https://i.ibb.co/LRP4ZLc/imageedit-1-3775271962.png');
    world.spritesheets.bg = loadImage('https://i.ibb.co/mFSJZkV/1607-m00-i101-n021-p-c25-179331677-space-w.jpg');
    //world.spritesheets.explosion.sprite = loadImage('https://i.ibb.co/fqdThrP/explosion.png');
    world.spritesheets.bullet.fire = loadImage('https://i.ibb.co/LYcsyXL/icon-bullet-gold-short.png');
    world.spritesheets.bullet.explosion = loadImage('https://i.ibb.co/BP7Qtz2/bullet-explosion.png');
    
    id('load').style.display = 'none';
    //once = true;
}

function setup() {
    // setup or create the game world
    createCanvas(width, height); // create a canvas for the world using the built-in p5 createCanvas function.
    
    
    /*initFirebase(); // init firebase
    //initPlayers();
    initPlayerInDb();
    getPlayers();
    getBullets();
    playerLost();
    restart();*/
    
    // My player
    
    world.myPlayer = new Player(uid, '', random(0, width - 60), random(0, height - 50), '', world.spritesheets.player);
    
    //enemyFromLeft();
    setInterval(enemyFromLeft, 15000); enemyFromLeft();
    setInterval(enemyFromRight, 18000); enemyFromRight();
    setInterval(enemyFromTop, 18000); //enemyFromTop();
    setInterval(enemyFromBottom, 15000); //enemyFromBottom();
    
    bg1 = new Bg(-width, 0, width * 2, height, world.spritesheets.bg);
    bg2 = new Bg(width, 0, (width * 2) + 5, height, world.spritesheets.bg);
    generateFrames(); // generate frames for the world
    
    //console.log('Life really sucks. xD');
    
    restart();
}

/* draw function */ function draw() {
    // update the game worlD
    background(255);
    imageMode(CORNER);
    bg1.display(); bg1.update(vector);
    bg2.display(); bg2.update(vector);
    
    imageMode(CENTER);
    
    world.myPlayer.init();
    
    for (let b of world.bullets) {
        b.display();
        b.update(vector);
    }
    
    delBullet(world.bullets);
    
    for (let enemy of world.players) {
        enemy.init();
        enemy.updateEnemy(vector);
    }
    
    hitted(world.bullets, world.players);
    collisionWithMainPlayer();
    checkGameOver();
    
    
    for (let b of world.enemyBullets) {
        b.display();
        b.update(vector);
    }
    
    delBullet(world.enemyBullets);
    delBullet(world.players);
    
    fill('#fff');
    text('Score: ' + score, 10, 20);
    
    //if (world.myPlayer) {
        //world.myPlayer.init();
        //world.myPlayer.updateByDb();
        //world.myPlayer.update();
        //world.myPlayer.update(vector);
    //}
    
    
    //for (let p of world.players) {
        //p.init();
        //p.updateByDb();
        //p.update();
    //}
    
    //const player = world.players.find(p => { return p.id == uid });
    
    //if (player) { for (let i = 0; 
    //i < player.bullets.length; i++) {
        ///player.bullets[i].display();
        ////player.bullets[i].update(vector); 
   // } }
    
    //if (player) {delBullet(player.bullets);
    //hitted(player.bullets, world.players);}
    //checkGameOver();
    
    //fill('#fff');
    //if (world.myPlayer)
    //text(world.myPlayer.health, 10, 10);
}

/////// Joystick by Martin 
// This cool joystick was made by Martin. Such a awesome dude :-p

function create_joystick(on_action, front,back) {
    var front = front || {radius: 24, bg: "lime"};
    var back = back || {radius: 40, bg: "black"};
    var r = front.radius, R = back.radius;
    var c = front.bg, C = back.bg; 

    var touch = {on: false}; 
    var start = function(e) {
        if(touch && !touch.on) {
            touch = {
                x:e.touches[0].clientX,
                y:e.touches[0].clientY,
                on:true};
            this.back = document.createElement("div");
            this.back.style.position = "absolute";
            this.back.style.width = 2*R+"px";
            this.back.style.height = 2*R+"px";
            this.back.style.borderRadius = "50%";
            this.back.style.background = C;
            this.back.style
            .backgroundPosition = 'center';
            this.back.style.backgroundSize = 'cover';
            this.front = document.createElement("div");
            this.front.style.position = "absolute";
            this.front.style.width = 2*r+"px";
            this.front.style.height = 2*r+"px";
            this.front.style.borderRadius = "50%";
            this.front.style.background = c;
            this.front.backgroundPosition = 'center';
            this.front.style.backgroundSize = 'cover';
            this.front.style.left = touch.x-r+"px";
            this.front.style.top = touch.y-r+"px";
            this.back.style.left = touch.x-R+"px";
            this.back.style.top = touch.y-R+"px";
            document.body.appendChild(this.back);
            document.body.appendChild(this.front);
        }
    }
    
    var stop = function(e) {
        if(touch && touch.on) {
            document.body.removeChild(this.back);
            document.body.removeChild(this.front);
            touch.on = false;
            on_action({dx:0, dy:0});
        }
    }
    
    var move = function(e) {
        var x = e.touches[0].clientX,
            y = e.touches[0].clientY;
        if(touch && touch.on) {
            var dx = (x-touch.x);
            var dy = (y-touch.y);
            var l = Math.hypot(dx,dy);
            var max = 4*R/5;
            if(l>max) {dx*=max/l; dy*=max/l}
            this.front.style.left = 
                parseFloat(this.back.style.left)+dx+r/2+"px";
            this.front.style.top = 
                parseFloat(this.back.style.top)+dy+r/2+"px";
            dx /= max; dy /= max;
            on_action({dx:dx, dy:dy});
        }
    }
    
    document.addEventListener("touchstart", start);
    document.addEventListener("touchmove", move);
    document.addEventListener("touchend", stop);
    document.addEventListener("touchcancel", stop);
    
}

/* 

    #############################################################
      
          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

(   By ~Aryan Maurya Mr.perfect https://amsrportfolio.netlify.app  )

          @@@@@@@@@@    &&&&&&&&&&&&&&&&&&&    %%%%%%%%%%

    #############################################################

*/
