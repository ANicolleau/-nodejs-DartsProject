const inquirer = require('inquirer')
const player = require('./players')
let WorldTour = require('./engine/gamemodes/around-the-world')
let ThreeHundreadAndOne = require('./engine/gamemodes/301')

console.log('Bienvenue dans notre comptabilité de fléchettes.')
Init()


async function InitNumberPlayers() {
    let number_of_players = 0
    let are_all_players_set = false
    while (!are_all_players_set) {
        await inquirer
            .prompt([
                {
                    name: 'number_of_players',
                    message: 'Veuillez entrer le nombre de joueur : \n'
                }
            ])
            .then(answer => {
                if (answer.number_of_players > 1) {
                    console.log(`Vous êtes ${answer.number_of_players} dans la partie.`)
                    number_of_players = answer.number_of_players
                    are_all_players_set = true
                } else {
                    console.log("Veuillez saisir un nombre entier.")
                }
            })
    }
    return number_of_players
}


async function CreatePlayers(counter) {
    let player_name = ''
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
    const players = new player(player_name)
    console.log(players)
    return players
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

async function playingThreeHundredAndOne(players) {
    let win = false
    let three_hundred_and_one = new ThreeHundreadAndOne()
    let multiplier = 'Simple'
    let correct_value = false
    for (let player of players) {
        player.arrow = player.gameArrow("301")
        for (player.arrow; player.arrow !== 0; player.arrow--) {
            correct_value = false
            while (!correct_value) {
                await inquirer
                    .prompt([
                        {
                            name: 'score',
                            message: `Veuillez entrer le score mit par ${player['name']}, il lui reste ${player.arrow} fléchettes. Son score actuel est de ${player.score}: \n`
                        },
                        {
                            type: "rawlist",
                            name: 'multiplier',
                            message: 'Choisissez le multiplicateur : \n',
                            choices: ["Simple", "Double", "Triple"],
                            filter: choice => {
                                switch (choice) {
                                    case "Simple":
                                        return 1
                                    case "Double":
                                        return 2
                                    case "Triple":
                                        return 3
                                }
                            }
                        }
                    ])
                    .then(answer => {
                        const is_score_possible = three_hundred_and_one.checkImpossible(answer.score)
                        const is_multiplier_possible = three_hundred_and_one.checkMultiplier(answer.multiplier)
                        const is_middle_multiplier_possible = three_hundred_and_one.checkMiddle(answer.score, answer.multiplier)
                        if (is_score_possible && is_multiplier_possible && is_middle_multiplier_possible) {
                            correct_value = true
                            three_hundred_and_one.handle_shot(player, answer.score, answer.multiplier)
                        }
                        // if ((answer.score <= 25 && !(answer.score in impossible)) || (answer.score <= 25 && answer.multiplicator != "Triple")) {
                        //     multiplicator = answer.multiplicator
                        //     ThreeHundreadAndOne.handle_shot(player, answer.score, answer.multiplicator)
                        //     continu = true
                        // }
                        // else if((answer.score == 25 && answer.multiplicator == "Triple")){
                        //     console.log(`${answer.score} en Triple impossible. Veuillez saisir un autre nombre ou un autre multiplicateur.`)
                        // }
                        // else
                        //     console.log(`${answer.score} impossible. Veuillez saisir un autre nombre.`)
                    })
            }
            three_hundred_and_one.DoWeHaveAWinner(player, multiplier)
        }
    }
    if (three_hundred_and_one.status === "ended") {
        win = true
        console.log(ThreeHundreadAndOne.getWinners())
    }
    if (!win)
        await playingThreeHundredAndOne(players)
}

async function playingWorldTour(players) {
    let win = false
    for (let player of players) {
        player.arrow = player.gameArrow("Tour du monde")
        console.log(`C'est au tour de ${player.name} \n`)
        for (player.arrow; player.arrow !== 0; player.arrow--) {
            await inquirer
                .prompt([
                    {
                        name: 'score',
                        message: `Veuillez entrer le score mis par ${player['name']}, il lui reste ${player.arrow} fléchettes. Son score actuel est de ${player.score}: \n`
                    }
                ])
                .then(answer => {
                    WorldTour.handle_shot(player, answer)
                })
            WorldTour.DoWeHaveAWinner(player, players.length)
        }
    }
    if (WorldTour.status === "ended") {
        win = true
        console.log(WorldTour.getWinners())
    }
    if (win !== true)
        playingWorldTour(players)
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
            for (let player of tab_of_players)
                player.score = player.gameScore("Tour du monde")
            playingWorldTour(tab_of_players)
            break
        case '301':
            for (let player of tab_of_players)
                player.score = player.gameScore("301")
            playingThreeHundredAndOne(tab_of_players)
            break
        case 'le Cricket':
            break
    }
}
