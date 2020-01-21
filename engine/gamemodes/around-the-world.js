let GameMode = require('../gamemode')

class AroundTheWorld extends GameMode {
    constructor() {
        super()
        this.sector_unlocked = false
    }

    doWeHaveAWinner(player) {
        let is_win = false
        if (player.score === 2) {
            this.winners.push(player.name)
            player.rank = this.winners.length + 1
            player.gameWin = true
            is_win = true
        }
        return is_win
    }


    handle_shot(player, score) {
        if (player.score === score) {
            player.score++
            console.log(`Bravo, le score de ${player.name} est maintenant de ${player.score}.\n`)
        } else
            console.log(`C'est raté pour ${player.name} ! \n`)
    }

}

module.exports = AroundTheWorld
