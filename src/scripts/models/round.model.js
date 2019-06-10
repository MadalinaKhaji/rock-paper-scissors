export class Round {
    constructor(userPick) {
        this.userPick = userPick;
    }
    getComputerPick() {
        let random = Math.random();
        if (random < 0.33) {
            return "rock";
        }
        else if (random < 0.66) {
            return "paper";
        }
        else {
            return "scissors";
        }
    }
    getRoundWinner(upick, cpick) {
        if (upick === cpick) {
            return "draft";
        }
        else if ((upick === "rock" && cpick === "paper") || (upick === "scissors" && cpick === "rock") || (upick === "paper" && cpick === "scissors")) {
            return "computer";
        }
        else {
            return "user";
        }
    }
}