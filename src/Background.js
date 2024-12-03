import Layer from "./Layer"

export default class Background {
  constructor(game) {
    this.game = game
    this.width = 1800
    this.height = 500

    

    this.fg = new Image()
    this.fg.src = "./src/assets/shovel/vintrigskogFG.png"
    this.gl = new Image()
    this.gl.src = "./src/assets/shovel/vintrigskogBG.png"
    this.ml = new Image()
    this.ml.src = "./src/assets/shovel/VintrigskogMG.png"

    this.backgroundLayers = [
      new Layer(this.game, this.width, this.height, 0.2, this.ml),
      new Layer(this.game, this.width, this.height, 0.5, this.gl),
      new Layer(this.game, this.width, this.height, 1, this.fg)
    ]
  }

  update(deltaTime) {
    this.backgroundLayers.forEach(layer => {
      layer.update(deltaTime)
    })
  }

  draw(ctx) {
    this.backgroundLayers.forEach(layer => {
      layer.draw(ctx)
    })
  }

}