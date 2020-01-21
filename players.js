class player{
    constructor(name){
        this.id = player.incrementId()
        this.name = name
        this.score = 0
        this.arrow = 1
    }

    static incrementId() {
        (!this.latestId) ? this.latestId = 1 : this.latestId++
        
        return this.latestId
      }
    
    scored(number){
    }
    gameScore(gameMode){
        let origin_score = 0
        switch(gameMode){
            case "Tour du monde":
                origin_score = 1
                break
            case "301":
                origin_score = 301
                break
            case "le Cricket":
                break
        }
        return origin_score
    }

    gameArrow(gameMode){
        let origin_arrow = 0
        switch(gameMode){
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