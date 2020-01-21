const inquirer = require('inquirer')
const player = require('./players')
let WorldTour = require('./games')

console.log('Bienvenue dans notre comptabilité de fléchettes.')
Init()
async function InitNumberPlayers() {
    let number = 0
    await inquirer
        .prompt([
            {
                name: 'number_of_players',
                message: 'Veuillez entrer le nombre de joueur : \n'
            }
        ])
        .then(answer => {
            console.log(`Vous êtes ${answer.number_of_players} dans la partie.`)
            number = answer.number_of_players
        })
    return number
}


async function CreatePlayers(counter) {

    await inquirer
        .prompt([
            {
                name: 'name_of_player',
                message: `Veuillez entrer le nom du joueur n°${counter} : \n`
            }
        ])
        .then(answer => {
            console.log(`Bienvenue ${answer.name_of_player} !`)
            player_name = answer.name_of_player
        })
    return players = new player(player_name)
}


async function GameSelection() {
    let game = ''
    await inquirer
        .prompt([
            {
                type: 'rawlist',
                name: 'game_type',
                message: 'Choisissez votre mode de jeu : \n',
                choices: ['Tour du monde', '301', 'le Cricket']
            }
        ])
        .then(answer => {
            console.info('Jeu choisi :', answer.game_type)
            game = answer.game_type
        })
    return game
}

async function playingWorldTour(player) {
    let win = false
    await inquirer
        .prompt([
            {
                name: 'score',
                message: `Veuillez entrer le score mis par ${player['name']}, son score actuel est de ${player.score}: \n`
            }
        ])
        .then(answer => {
            if (player['score'] + 1 == answer.score) {
                player['score']++
                console.log(`Bravo, le score de ${player['name']} est maintenant de ${player['score']}.`)
            }
            else
                console.log(`C'est raté pour ${player['name']} !`)
        })

    if (player['score'] == 20)
        win = true
    return win
}

async function Init() {
    let tab_of_players = []
    const number_of_player = await InitNumberPlayers()
    for (let i = 0; i < number_of_player; i++) {
        tab_of_players.push(await CreatePlayers(i + 1))
    }
    const gameMod = await GameSelection()
    switch (gameMod) {
        case 'Tour du monde':
            WorldTour = new WorldTour()
            tab_of_players.forEach( async element => {
                await playingWorldTour(element)
            })
            WorldTour.DoWeHaveAWinner(tab_of_players)
            break
        case '301':
            break
        case 'le Cricket':
            break
    }
}
