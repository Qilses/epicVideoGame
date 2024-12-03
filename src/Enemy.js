

class Enemy {
    constructor(){
        this.frameX = 0
        this.frameY = 0
        this.flip = false
        this.fps = 20
        this.timer = 0
        this.interval = 1000 / this.fps

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


    }
    draw (ctx) {
        ctx.drawImage(
            this.image,
            this.x, 
            this.y, 
            this.width, 
            this.height
        )

    }
}

export class Isbjorn extends Enemy {
    constructor (Game) {
        super ();

        this.image = new Image()
        this.image.src = "./src/assets/shovel/isbjörn.png"

        this.game = game
        this.width = 100
        this.hight = 100
        this.x = 200
        this.y = 200
        this.speedX = 2
        this.maxFrame = 5
    }
    update(deltaTime){
        super.update(deltaTime);
    }

}
export class Korp extends Enemy{


}