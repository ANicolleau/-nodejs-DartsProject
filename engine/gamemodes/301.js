let gamemode = require('../gamemode')

class ThreeHundredAndOne extends gamemode {
    constructor(id, mode, currentPlayerId, status) {
        super(id, mode, currentPlayerId, status)
    }

    doWeHaveAWinner(player, multiplier) {
        let is_win = false
        if (player.score === 0 && multiplier === 2) {
            this.winners.push(player.name)
            player.rank = this.winners.length + 1
            player.gameWin = true
            is_win = true
        }
        return is_win
    }

    checkMultiplier(multiplier) {
        let possible = false
        const possible_multiplier = [1, 2, 3]
        if (possible_multiplier.includes(multiplier))
            possible = true
        return possible
    }


    checkMiddle(points, multiplier) {
        let possible = true
        multiplier = +multiplier
        if (points === 25 && multiplier === 3)
            possible = false
        return possible
    }

    handle_shot(player, points, multiplier) {
        if (!points)
            points = 0
        points *= multiplier
        if (player.score >= points)
            player.score -= points
    }

}

module.exports = ThreeHundredAndOne