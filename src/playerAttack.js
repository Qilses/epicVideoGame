
const state = {
    WALKING: 0,
    ATTACK: 1
}

class State {
    constructor(state){
        this.state = state;
    }

}

export class Attack extends State {
    constructor(player){
        super('ATTACK');
        this.player = player;
        console.log("ATTACK")
    }
    enter(){
        this.frameY = 1
        this.maxFrames = 2
   
    }
    handleInput(input){
        if (input.includes(' ')) {
           this.player.setState(state.ATTACK); 
        }

    }

}

