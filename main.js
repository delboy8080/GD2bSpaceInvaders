let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 540;

class Player
{
    constructor(x, y, width, height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = 5;
    }
    
    draw()
    {
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
    moveLeft()
    {
        this.x -= this.speed;
        if(this.x < 0)
        {
            this.x = 0;
        }
    }
    moveRight()
    {
        this.x += this.speed;
        if(this.x >= canvas.width-this.width)
        {
            this.x = canvas.width - this.width;
        }
    }
    
    fire()
    {
        let bullet = new Bullet(this.x + (this.width/2)-2.5,
        this.y, 5, 10, 7);
        bullets.push(bullet);
    }
}

class Bullet
{
    constructor(x, y, width, height, speed)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }
    
    draw()
    {
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
    update()
    {
        this.y -= this.speed;
    }
}

class Alien
{
    constructor(x, y, width, height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    
    draw()
    {
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
const alienRows = 4;
const alienColumns = 10;
const alienWidth = 40;
const alienHeight = 20;
const alienPadding = 10;

let player = new Player(canvas.width/2-25, canvas.height-50, 50,20);
let bullets = [];
let aliens = createAliens();
let keyStates = {ArrowLeft: false, ArrowRight:false, Space: false};

function handleKeyDown(event)
{
    if(event.code in keyStates)
    {
        keyStates[event.code] = true;
    }
}
function handleKeyUp(event)
{
    if(event.code in keyStates)
    {
        keyStates[event.code] = false;
    }
}
function createAliens()
{
    let aliensArray = [];
    for(r = 0; r < alienRows; r++)
    {
        for(c = 0; c < alienColumns;c++)
        {
            const x = c * (alienWidth+alienPadding);
            const y = r * (alienHeight+alienPadding);
            aliensArray.push(new Alien(x, y, alienWidth, alienHeight));
            
        }
    }
    return aliensArray;
}

function draw()
{
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width, canvas.height);
    player.draw();
    aliens.forEach(alien => alien.draw());
    bullets.forEach(bullet => bullet.draw());
}

function gameLoop()
{
    draw();
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);






