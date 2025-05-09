import Layer from "./Layer"
import VinterSkogFG from ".assets/shovel/vintrigskogFG.png"
import VinterSkogMG from "./src/assets/shovel/VintrigskogMG.png"


export default class Background {
  constructor(game) {
    this.game = game
    this.width = 1800
    this.height = 500

    

    this.fg = new Image()
    this.fg.src = VinterSkogFG
    this.mg = new Image()
    this.mg.src = VinterSkogMG

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