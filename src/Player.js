import GameObject from "./GameObject"
import { Attack } from "./playerAttack.js"
import Projectile from "./Projectile";
import UserInterface from "./UserInterface.js"


export default class Player extends GameObject {
  constructor(game) {
    super(game, 0, 0, 128 * 1.4, 128 * 0.8, "#fff", 5)

    //Vilken bild vi andvänder till spelaren 
    this.image = new Image()
    this.image.src = "./src/assets/shovel/grabbmedspade_shema.png"

    //spelarens constanta hastighet "vanlight" vis
    this.speedX = 0
    this.speedY = 0

    //Spelarens storlek 
    this.frameWidth = 200
    this.frameHeight = 223
    this.frameX = 0
    this.frameY = 0
    this.flip = false
   
    console.log(this.Player)
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

    if (this.game.keys.has(" ")) {
      this.attack()
    }

    this.x += this.speedX
    this.y += this.speedY

    if (this.timer > this.interval) {
      this.frameX--
      this.timer = 0
    } else {
      this.timer += deltaTime
    }

    if (this.frameX >= this.maxFrames) {
      this.frameX = 0
    }



    //boarder
    function boarderCollison(x, y) {
      return x < -54 || y < 0 || x > 720 || y > 510;
    }

    if (boarderCollison(this.x, this.y)) {
      if (this.x < -54) this.x = -54;         // Sätter gräns vid 0 på vänster sida
      if (this.y < 0) this.y = 0;         // Sätter gräns vid 0 på toppen
      if (this.x > 720) this.x = 720;     // Sätter gräns vid 800 på höger sida
      if (this.y > 510) this.y = 510;
    }

  }


  attack() {
    console.log("svinga spade")
    if (this.attackDelay > 0) return
  
    this.attackDelay = this.attackInterval

    this.game.projectiles.push(
      new Projectile(
        this.game,
        this.x + this.width / 2 - 2,
        this.y,
        4,
        4
      )
    )
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
