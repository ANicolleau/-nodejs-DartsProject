// class Darts {
//     constructor(mode) {
//         this.min_sector = 1
//         this.max_sector = 20
//         this.number_players = 0
//         this.finished = false
//         // this.players dans constructeur

//         // this.mode = mode//'around-the-world' | '301' | 'cricket',
//         // currentPlayerId = null | string | number,
//         // status = 'draft' | 'started' | 'ended'        
//     }
// }

// class WorldTour extends Darts {
//     constructor() {
//         super()
//         this.sector_unlocked = false
//     }

//     async DoWeHaveAWinner(tab_of_players) {
//         await tab_of_players.forEach(element => {
//             if(element['score'] == 20){
//                 console.log(`${element['name']} a gagné`)
//             }
//         })
//     }
    
// }
// // handle shot gérer le tir donné ( esque le mec a tiré sur le bon secteur ou non et estce qu'il avance ou non et est-ce qu'il a gagné ou non)
// // regarder les joueurs en jeux, check winner  fonction commune à tous les modes de jeux
module.exports = WorldTour