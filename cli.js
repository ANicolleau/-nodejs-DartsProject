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
    return new player(player_name)
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

async  function playingThreeHundredAndOne(players) {
    let win = false
    let three_hundred_and_one = new ThreeHundreadAndOne(1, "Tour du monde", 1, "Started")
    for (let player of players) {
        player.arrow = player.gameArrow("301")
        for (player.arrow; player.arrow !== 0; player.arrow--) {
            const is_win_for_this_player = player.getWin()
            if (is_win_for_this_player)
                break
            let correct_value = false
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
                        answer.multiplier = +answer.multiplier
                        const points = +answer.score
                        player.score = +player.score
                        const is_score_possible = three_hundred_and_one.checkImpossible(points)
                        const is_multiplier_possible = three_hundred_and_one.checkMultiplier(answer.multiplier)
                        const is_middle_multiplier_possible = three_hundred_and_one.checkMiddle(points, answer.multiplier)
                        if (is_score_possible && is_multiplier_possible && is_middle_multiplier_possible && !is_win_for_this_player) {
                            correct_value = true
                            three_hundred_and_one.handle_shot(player, points, answer.multiplier)
                            if (three_hundred_and_one.doWeHaveAWinner(player, answer.multiplier))
                                console.log(`C'est gagné pour ${player.name}`)
                        }
                    })
            }
        }
    }
    if ((players.length === three_hundred_and_one.winners.length + 1) || players.length === three_hundred_and_one.winners.length) {
        win = true
        console.log(three_hundred_and_one.getWinners())
    }
    if (!win)
        await playingThreeHundredAndOne(players)
}

async function playingWorldTour(players) {
    let win = false
    let world_tour = new WorldTour(1, "Tour du monde", 1, "Started")
    for (let player of players) {
        player.arrow = player.gameArrow("Tour du monde")
        console.log(`C'est au tour de ${player.name} \n`)
        for (player.arrow; player.arrow !== 0; player.arrow--) {
            const is_win_for_this_player = player.getWin()
            if (is_win_for_this_player)
                break
            let correct_value = false
            while (!correct_value) {
                await inquirer
                    .prompt([
                        {
                            name: 'score',
                            message: `Veuillez entrer le score mit par ${player['name']}, il lui reste ${player.arrow} fléchettes. Son score actuel est de ${player.score}: \n`
                        }
                    ])
                    .then(answer => {
                        const score = +answer.score
                        console.log(score)
                        const is_score_possible = world_tour.checkImpossible(score)
                        if (is_score_possible && !is_win_for_this_player) {
                            correct_value = true
                            world_tour.handle_shot(player, score)
                            if (world_tour.doWeHaveAWinner(player, answer.multiplier))
                                console.log(`C'est gagné pour ${player.name}`)
                        }
                    })
            }
        }
    }
    if ((players.length === world_tour.winners.length + 1) || players.length === world_tour.winners.length) {
        win = true
        console.log(world_tour.getWinners())
    }
    if (win !== true)
        await playingWorldTour(players)
}

function shuffle(array) {
    array = array.sort(() => Math.random() - 0.5);
    return array
}

async function Init() {
    let tab_of_players = []
    const number_of_player = await InitNumberPlayers()
    for (let i = 0; i < number_of_player; i++) {
        tab_of_players.push(await CreatePlayers(i + 1))
    }
    tab_of_players = shuffle(tab_of_players)
    const gameMod = await GameSelection()
    switch (gameMod) {
        case 'Tour du monde':
            for (let player of tab_of_players)
                player.score = player.gameScore("Tour du monde")
            await playingWorldTour(tab_of_players)
            break
        case '301':
            for (let player of tab_of_players)
                player.score = player.gameScore("301")
            await playingThreeHundredAndOne(tab_of_players)
            break
        case 'le Cricket':
            break
    }
}
