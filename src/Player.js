import GameObject from "./GameObject"

export default class Player extends GameObject {
  constructor(game) {
    super(game, 0, 0, 128 * 1.4, 128 * 0.8, "#fff", 5)

    this.image = new Image()
    this.image.src = "./src/assets/shovel/grabbmedspade.png"

    this.speedX = 0
    this.speedY = 0

    this.frameWidth = 380
    this.frameHeight = 260
    this.frameX = 0
    this.frameY = 0
    this.flip = false
 
  }

  update(deltaTime) {
    if (this.game.keys.has("ArrowLeft")) {
      this.speedX = -this.maxSpeed
      this.flip = true
    } else if (this.game.keys.has("ArrowRight")) {
      this.flip = false
      this.speedX = this.maxSpeed
    } else {
      this.speedX = 0
    }

    if (this.game.keys.has("ArrowUp")) {
      this.speedY = -this.maxSpeed
    } else if (this.game.keys.has("ArrowDown")) {
      this.speedY = this.maxSpeed
    } else {
      this.speedY = 0
    }

   /* if (this.speedX !== 0 || this.speedY !== 0) {
      this.frameY = 3
      this.maxFrames = 8
     
    } else {
      this.frameY = 0
      this.maxFrames = 2
      
    }
*/
    this.x += this.speedX
    this.y += this.speedY

    if (this.timer > this.interval) {
      this.frameX++
      this.timer = 0
    } else {
      this.timer += deltaTime
    }

    if (this.frameX >= this.maxFrames) {
      this.frameX = 0
    }

      
   
    //boarder
    function boarderCollison(x, y) {
      return x < 0 || y < 0 || x >720 || y >396;
    } 
      if (boarderCollison(this.x, this.y)) {
      if (this.x < 0) this.x = 0;         // Sätter gräns vid 0 på vänster sida
      if (this.y < 0) this.y = 0;         // Sätter gräns vid 0 på toppen
      if (this.x > 720) this.x = 720;     // Sätter gräns vid 800 på höger sida
      if (this.y > 396) this.y = 396;   
      }

  }

    draw(ctx) {
      if (this.flip) {
        ctx.save();
        ctx.scale(-1, 1);  // Spegelvända bilden horisontellt
      }
    
      // Beräkna den spegelvända x-positionen
      let xPos = this.flip ? -this.x - this.width : this.x;
    
      // Rita bilden på canvasen
      ctx.drawImage(
        this.image,
        this.frameX * this.frameWidth,
        this.frameY * this.frameHeight,
        this.frameWidth,
        this.frameHeight,
        xPos,  // Placera vid rätt x-koordinat (kompenserad för spegling)
        this.y,  // y-positionen påverkas inte av spegelvändningen
        this.width,
        this.height
      );
    
      // Återställ transformeringen om spegelvändning har använts
      if (this.flip) {
        ctx.restore();
      }
    }
}
