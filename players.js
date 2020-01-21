class player {
    constructor(name) {
        this.id = player.incrementId()
        this.name = name
        this.score = 0
        this.arrow = 1
        this.gameWin = false
        this.rank = undefined
    }

    static incrementId() {
        (!this.latestId) ? this.latestId = 1 : this.latestId++

        return this.latestId
    }

    getRank() {
        return this.rank
    }

    getWin() {
        return this.gameWin
    }

    gameScore(gameMode) {
        let origin_score = 0
        switch (gameMode) {
            case "Tour du monde":
                origin_score = 1
                break
            case "301":
                origin_score = 50
                break
            case "le Cricket":
                break
        }
        return origin_score
    }

    gameArrow(gameMode) {
        let origin_arrow = 0
        switch (gameMode) {
            case "Tour du monde":
                origin_arrow = 3
                break
            case "301":
                origin_arrow = 3
                break
            case "le Cricket":
                break
        }
        return origin_arrow
    }
}

module.exports = player