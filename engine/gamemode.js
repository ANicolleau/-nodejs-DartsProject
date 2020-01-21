class GameMode {

    constructor(id, mode, currentPlayerId, status) {
        this.id = id
        this.mode = mode
        this.currentPlayerId = currentPlayerId
        this.status = status
        this.winners = []
        this.name = "party"
    }

    getWinners() {
        let sentence_winner = ''
        if (this.winners.length === 1)
            sentence_winner = `Partie terminée. Le gagnant est ${this.winners[0]}.`
        else
            sentence_winner = `Partie terminée. Les gagnants sont ${this.winners.join(',')}.`
        return sentence_winner
    }

    checkImpossible(points) {
        let possible = false
        const impossible_points = [21, 22, 23, 24]
        if (!impossible_points.includes(points) && (points <= 20 || points === 25)) {
            possible = true
        }
        return possible
    }
}

module.exports = GameMode
