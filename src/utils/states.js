const allStates = [ ]

for (let i = 0; i < (3 * 3 * 3 * 3 * 3) - 1; i++) {
    allStates.push(i.toString(3).padStart(5, '0'))
}

module.exports = {
    states: allStates
}
