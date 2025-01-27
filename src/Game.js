import Background from "./Background.js"
import GameObject from "./GameObject.js"
import InputHandler from "./InputHandler.js"
import Player from "./Player.js"
import { Isbjorn, Korp } from "./Enemy.js"
import UserInterface from "./UserInterface.js"


export default class Game {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.background = new Background(this)
    this.keys = new Set()
    new InputHandler(this)
    
    this.enemies = []
    this.enemiesTimer = 0
    this.enemiesInterval = 1000

    this.debug = false

    //Laser.com
    this.projectiles = []
    
    this.player = new Player(this)
    this.numberOfMuladeBjörnar = 0

  }

  update(deltaTime) {
    this.background.update(deltaTime)
    this.player.update(deltaTime)
    
    if (this.enemiesTimer < this.enemiesInterval && Math.random() < 0.06) {
      this.addEnemy()
      this.enemiesTimer = 0
      console.log("Bear")
    } else {
      this.enemiesTimer += deltaTime
    } 
      this.enemies.forEach(enemy =>{
        enemy.update(deltaTime)

      })
      //fein
      this.enemies.forEach((enemy) => {
        enemy.update(deltaTime)
        if (this.checkCollision(enemy, this.player)) {  
          enemy.markedForDeletion = true
          this.numberOfMuladeBjörnar++
        }
      })

      //laser.com
      this.projectiles.forEach((projectile) => {
        projectile.update(deltaTime)
      })
      this.projectiles.forEach((projectile) => {
        this.enemies.forEach((enemy) => {
          if (this.checkCollision(projectile, enemy)) {
            this.score += 10
            projectile.markedForDeletion = true
            enemy.markedForDeletion = true
          }
        })
      })
      this.projectiles = this.projectiles.filter((p) => !p.markedForDeletion)
      this.enemies = this.enemies.filter((e) => !e.markedForDeletion)
    
  }
  draw(ctx) {
    this.background.draw(ctx)
    this.player.draw(ctx)

    console.log(this.userInterface);
    if (this.userInterface) { 
      this.userInterface.draw(ctx);
  } else {
      console.error("User Interface is not defined");
  }
    this.projectiles.forEach((projectile) => {
      projectile.draw(ctx)
    })

    this.enemies.forEach(Enemy =>{
      Enemy.draw(ctx)
    })
  }

  addEnemy(enemiesInterval){
   
    this.enemies.push(new Isbjorn(this))
  }
  checkCollision(a, b) {
    return a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
  }
}
