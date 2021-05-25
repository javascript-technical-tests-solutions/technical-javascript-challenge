function championsestCountries(data, selectedTournament) {
    let championsest = {};
    const tournaments = selectedTournament ? [selectedTournament] : Object.keys(data);

    tournaments.forEach(tournament => {
        if (data[tournament]) {
            data[tournament].forEach(match => {
                if (match.champion == 'East Germany' || match.champion == 'West Germany') {
                    match.champion = 'Germany';
                }

                championsest[match.champion] = (championsest[match.champion] || 0) + 1
            });
        }
    });

    championsest = Object.entries(championsest);

    championsest.sort(function(a, b) {
        return b[1] - a[1];
    });

    championsest.length = 3;

    return championsest.map((item) => `${item[0]}: ${item[1]}`);
}

function mostRunnerUpCountries(data, selectedTournament) {
    let mostRunnerUp = {};
    const tournaments = selectedTournament ? [selectedTournament] : Object.keys(data);

    tournaments.forEach(tournament => {
        if (data[tournament]) {
            data[tournament].forEach(match => {
                if (match.champion == 'East Germany' || match.champion == 'West Germany') {
                    match.champion = 'Germany';
                }

                mostRunnerUp[match.runnerUp] = (mostRunnerUp[match.runnerUp] || 0) + 1;
            });
        }
    });

    mostRunnerUp = Object.entries(mostRunnerUp);

    mostRunnerUp.sort(function(a, b) {
        return b[1] - a[1];
    });

    mostRunnerUp.length = 3;

    return mostRunnerUp.map((item) => `${item[0]}: ${item[1]}`);
}

function matchesWithoutHeadquarter(data) {
    let matches = {};
    const tournaments = Object.keys(data);

    tournaments.forEach(tournament => {
        let tournamentMatches = data[tournament].filter(item => !item.headquarter);
        if (tournamentMatches.length) {
            matches[tournament] = tournamentMatches.map(item => `${item.year} => ${item.champion} vs ${item.runnerUp}`);
        }
    });

    return matches;
}

function championsHeadquarter(data) {
    let matches = {};
    const tournaments = Object.keys(data);

    tournaments.forEach(tournament => {
        let tournamentMatches = data[tournament].filter(item => item.headquarter == item.champion);
        if (tournamentMatches.length) {
            matches[tournament] = tournamentMatches.map(item => `${item.year} => ${item.champion} vs ${item.runnerUp} (${item.headquarter})`);
        }
    });

    return matches;
}

function finalsSolvedInPenalties(data) {
    let matches = {};
    const tournaments = Object.keys(data);

    tournaments.forEach(tournament => {
        let tournamentMatches = data[tournament].filter(item => (item.score && (item.score || '').endsWith('P')));
        if (tournamentMatches.length) {
            matches[tournament] = tournamentMatches.map(item => `${item.year} => ${item.champion} vs ${item.runnerUp} (${item.score})`);
        }
    });

    return matches;
}

function totalGoals(data) {
    let resultTournaments = {};
    const tournaments = Object.keys(data);

    tournaments.forEach(tournament => {
        let tournamentGoals = 0;
        data[tournament].forEach(match => {
            let scores = match.score.replace('P', '').split(',');
            scores.forEach(score => {
                let goals = score.split('-').map(item => item.trim()).map(item => isNaN(item) ? 0 : parseInt(item));
                if (goals.length === 2) {
                    tournamentGoals += goals[0] + goals[1];
                }
            });

        });
        resultTournaments[tournament] = tournamentGoals;
    });

    return resultTournaments;
}

function championshipsConsecutively(data, selectedTournament) {
    let consecutively = {};
    let temp = '';

    if (selectedTournament) {
        if (data[selectedTournament]) {
            data[selectedTournament].forEach(match => {
                if (match.champion == 'East Germany' || match.champion == 'West Germany') {
                    match.champion = 'Germany';
                }

                if (temp.champion == match.champion) {
                    if (!consecutively[temp.champion]) {
                        consecutively[temp.champion] = [];
                    }
                    consecutively[temp.champion].push(`${temp.year} - ${match.year}`);
                }

                temp = match;
            });
        }
    }

    return consecutively;
}

function runnerUpWhitoutChampionships(data) {
    let runnerUps = [];
    let champions = [];
    let runnerUpWithoutChampions = [];
    const tournaments = Object.keys(data);

    tournaments.forEach(tournament => {
        data[tournament].reduce((acc, current) => {
            if (acc.indexOf(current.champion) === -1) {
                acc.push(current.champion);
            }
            return acc;
        }, champions);

        data[tournament].reduce((acc, current) => {
            if (acc.indexOf(current.runnerUp) === -1) {
                acc.push(current.runnerUp);
            }
            return acc;
        }, runnerUps);
    });

    runnerUpWithoutChampions = runnerUps.filter(item => {
        return champions.indexOf(item) === -1 ? true : false;
    });

    return runnerUpWithoutChampions;
}

function finalsSolvedManyMatches(data) {
    let matches = {};
    const tournaments = Object.keys(data);

    tournaments.forEach(tournament => {
        let tournamentMatches = data[tournament].filter(item => item.score.indexOf(',') !== -1);
        if (tournamentMatches.length) {
            matches[tournament] = tournamentMatches.map(item => `${item.year} => ${item.champion} vs ${item.runnerUp} (${item.score})`);
        }
    });

    return matches;
}

function worldCupInLeapYear(data) {
    let tournamentsInLeapYear = [];

    data.worldCup.forEach(item => {
        if (item.year % 4 == 0) {
            tournamentsInLeapYear.push(item);
        }
    });

    return tournamentsInLeapYear;
}

module.exports = {
    championsestCountries,
    mostRunnerUpCountries,
    matchesWithoutHeadquarter,
    championsHeadquarter,
    finalsSolvedInPenalties,
    totalGoals,
    championshipsConsecutively,
    runnerUpWhitoutChampionships,
    finalsSolvedManyMatches,
    worldCupInLeapYear
};