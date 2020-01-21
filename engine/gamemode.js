class GameMode {
    // constructor(mode) {
    //     this.min_sector = 1
    //     this.max_sector = 20
    //     this.number_players = 0
    //     this.finished = false
    //     // this.players dans constructeur

    // }

    constructor(id, mode, name, currentPlayerId, status, createdAt) {
        // this.players dans constructeur
        this.id = id
        this.mode = mode
        this.name = name
        this.currentPlayerId = currentPlayerId
        this.status = status
        this.createdAt = createdAt
        this.winners = []        
    }

    getWinners(){
        let sentence_winner = ''
        if (this.winners.length == 1)
            sentence_winner = `Partie terminée. Le gagnant est ${this.winners[0]}.`
        else
            sentence_winner = `Partie terminée. Les gagnants sont ${this.winners.join(',')}.`
        return sentence_winner
    }
}

module.exports = GameMode
