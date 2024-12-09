import Background from "./Background.js"
import GameObject from "./GameObject.js"
import InputHandler from "./InputHandler.js"
import Player from "./Player.js"
import { Isbjorn, Korp } from "./Enemy.js"

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

    this.player = new Player(this)

  }

  update(deltaTime) {
    this.background.update(deltaTime)
    this.player.update(deltaTime)
    
    if (this.enemiesTimer < this.enemiesInterval && Math.random() < 0.04) {
      this.addEnemy()
      this.enemiesTimer = 0
    } else {
      this.enemiesTimer += deltaTime
    } 
      this.enemies.forEach(enemy =>{
        enemy.update(deltaTime)

      })
  }
  draw(ctx) {
    this.background.draw(ctx)
    this.player.draw(ctx)

    this.enemies.forEach(Enemy =>{
      Enemy.draw(ctx)
    })
  }

  addEnemy(enemiesInterval){
   
    this.enemies.push(new Isbjorn(this))
  }
}
