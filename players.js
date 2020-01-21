class player{
    constructor(name){
        this.id = player.incrementId()
        this.name = name
        this.score = 0
    }

    static incrementId() {
        (!this.latestId) ? this.latestId = 1 : this.latestId++
        
        return this.latestId
      }
    
    scored(number){
        
    }
}

module.exports = player