class Game {
    constructor(roundNo = 3){
        this.roundNo = roundNo;
        this.rounds = [];
        this.playerWins = 0;
        this.computerWins = 0;
    }
}

module.exports = Game;