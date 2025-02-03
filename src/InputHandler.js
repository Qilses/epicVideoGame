export default class InputHandler {
  constructor(game) {
    this.game = game

    window.addEventListener('keydown', (event) => {
      this.game.keys.add(event.key)   

    })
    window.addEventListener('keyup', (event) => {
      this.game.keys.delete(event.key)
    })
  }
}
