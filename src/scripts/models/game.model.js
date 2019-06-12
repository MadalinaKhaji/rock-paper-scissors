class Game {
    constructor(playerUsername = "User", roundNo = 5){
        this.playerUsername = playerUsername;
        this.roundNo = roundNo;
        this.rounds = [];
        this.playerWins = 0;
        this.computerWins = 0;
    }
}

module.exports = Game;