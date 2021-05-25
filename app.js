const data = require('./sources/champions.json');
const {
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
} = require('./challenges');


// 1. The championsest countries (Confederation + World Cup or choose one tournament).
console.log('------------------------------------------------------------------------------------');
console.log('- The championsest countries (Confederation + World Cup). -');
console.log(championsestCountries(data, null));
console.log('------------------------------------------------------------------------------------');
console.log('- The championsest countries (One tournament: concacaf). -');
console.log(championsestCountries(data, 'concacaf'));


// 2. The most runnerUp countries (Confederation + World Cup or choose one tournament).
console.log('------------------------------------------------------------------------------------');
console.log('- The most runnerUp countries (Confederation + World Cup). -');
console.log(mostRunnerUpCountries(data, null));
console.log('------------------------------------------------------------------------------------');
console.log('- The most runnerUp countries (One tournament: concacaf). -');
console.log(mostRunnerUpCountries(data, 'concacaf'));


// 3. Tournaments without headquarter.
console.log('------------------------------------------------------------------------------------');
console.log('- Tournaments without headquarter. -');
console.log(matchesWithoutHeadquarter(data));


// 4. Champions Headquarters.
console.log('------------------------------------------------------------------------------------');
console.log('- Champions Headquarters. -');
console.log(championsHeadquarter(data));


// 5. All finals solved in penalties.
console.log('------------------------------------------------------------------------------------');
console.log('- All finals solved in penalties. -');
console.log(finalsSolvedInPenalties(data));


// 6. Total goals in each tournament.
console.log('------------------------------------------------------------------------------------');
console.log('- Total goals in each tournament. -');
console.log(totalGoals(data));


// 7. Championships consecutively (Choose one tournament)
console.log('------------------------------------------------------------------------------------');
console.log('- Championships consecutively (One tournament: concacaf) -');
console.log(championshipsConsecutively(data, 'concacaf'));


// 8. Runner up countries without championships.
console.log('------------------------------------------------------------------------------------');
console.log('- Runner up countries without championships. -');
console.log(runnerUpWhitoutChampionships(data, 'concacaf'));


// 9. All finals solved with more than one match.
console.log('------------------------------------------------------------------------------------');
console.log('- All finals solved with more than one match. -');
console.log(finalsSolvedManyMatches(data));


// 10. World cup tournament in leap year.
console.log('------------------------------------------------------------------------------------');
console.log('- World cup tournament in leap year. -');
console.log(worldCupInLeapYear(data));