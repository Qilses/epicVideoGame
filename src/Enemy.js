import Player from "./Player"

class Enemy {
    constructor(){
        
        this.frameX = 0
        this.frameY = 0
        this.flip = false
        this.fps = 20
        this.timer = 0
        this.interval = 1000 / this.fps

        //Spelare aHAHA
        this.player = new Player(this)
        
    }
    update (){
        //rörelser
        this.x += this.speedX
        this.y += this.speedY
        if (this.timer < this.interval)  {
            this.timer = 0
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0
        }else{
            this.frameTimer += deltatime;
        }
        Enemy.prototype.update = function(playerX, playerY) {
            // Rotate the enemy to face the player
            this.rotation = Math.atan2(this.y - playerY, this.x - playerX) - 2.35;
        
            // Move in the direction we're facing
            this.x += Math.sin(this.rotation) * this.speed;
            this.y += Math.cos(this.rotation) * this.speed;
        }


    }
    draw(ctx) {
        ctx.drawImage(
            this.image,
            this.x,
            this.y,
            this.width,
            this.height
        );
      
    }    
}

export class Isbjorn extends Enemy {
    constructor (Game) {
        super ();
        this.game = game
        
        this.width = 100
        this.height = 60
        this.x = Math.random() * (this.game.width - this.width);
        this.y = Math.random() * this.game.height
        this.speedX = 0
        this.speedY = 0
        this.angle = 0
        this.va = Math.random() * 0.1 + 0.1
        
        this.image = new Image()    
        this.image.src = "./src/assets/shovel/isbjörn.png"      
        this.image.onload = () => {
            console.log("Isbjorn image loaded");
        };
    }
    draw(ctx) {
        if (this.image.complete) { // Check if the image is loaded
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }


    
    update(deltaTime){
        super.update(deltaTime);
      
    }

}
export class Korp extends Enemy{
    constructor (Game) {
        super ();
        this.game = game
        
        this.width = 100
        this.height = 60
        this.x = Math.random() * (this.game.width - this.width);
        this.y = Math.random() * this.game.height
        this.speedX = 0
        this.speedY = 0
        this.angle = 0
        this.va = Math.random() * 0.1 + 0.1
        
        this.image = new Image()    
        this.image.src = "./src/assets/shovel/korp.png"       

    }
    update(deltaTime){
        super.update(deltaTime);
      
    }

}