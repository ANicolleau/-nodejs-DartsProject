let gamemode = require('../gamemode')

class ThreeHundreadAndOne extends gamemode {
    constructor() {
        super()
    }

    DoWeHaveAWinner(player, multiplier) {
        if (player.score === 0 && multiplier === "Double") {
            this.winners.push(player.name)
            this.status = "ended"
        }
    }

    checkImpossible(points) {
        let possible = false
        console.log("points : " + points)
        points = +points
        const impossible_points = [21, 22, 23, 24]
        if (!impossible_points.includes(points) && (points <= 20 || points === 25)) {
            possible = true
        }
        console.log("checkImpossible possible " + possible)
        return possible
    }

    checkMultiplier(multiplier) {
        console.log("multiplier : " + multiplier)
        let possible = false
        multiplier = +multiplier
        const possible_multiplier = [1, 2, 3]
        if (possible_multiplier.includes(multiplier))
            possible = true
        console.log("checkMultiplier possible " + possible)
        return possible
    }


    checkMiddle(points, multiplier) {
        let possible = true
        points = +points
        multiplier = +multiplier
        if (points === 25 && multiplier === 3)
            possible = false
        console.log("checkMiddle possible " + possible)
        return possible
    }

    handle_shot(player, points, multiplier) {
        if (!points)
            points = 0
        points *= multiplier
        if (player.score >= points)
            player.score -= points
        return points
    }

}

module.exports = ThreeHundreadAndOne