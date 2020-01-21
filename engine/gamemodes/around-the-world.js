let gamemode = require('../gamemode')

class AroundTheWorld extends gamemode {
    constructor() {
        super()
        this.sector_unlocked = false
    }

    async DoWeHaveAWinner(player) {
        if (player.score === 2) {
            this.winners.push(player.name)
            this.status = "ended"
        }
    }


    async handle_shot(player, answer) {
        if (player.score === answer.score) {
            player.score++
            console.log(`Bravo, le score de ${player.name} est maintenant de ${player.score}.\n`)
        } else
            console.log(`C'est raté pour ${player.name} ! \n`)
    }

}

module.exports = AroundTheWorld
