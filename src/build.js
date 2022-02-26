const validAnswers = require('./data/possible-values.json')
const validGuesses = require('./data/valid-guess.json')
const { evaluate } = require('./utils/operations')

console.log('Building information model')

const states = [ ]

for (let i = 0; i < (3 * 3 * 3 * 3 * 3) - 1; i++) {
    states.push(i.toString(3).padStart(5, '0'))
}

const res = validGuesses.map(guess => {
    let bitSum = 0

    for (let state of states) {
        const evaluation = evaluate(guess, state)

        if (evaluation.bits) {
            bitSum += evaluation.bits
        }
    }

    return {
        word: guess,
        averageBits: bitSum / states.length
    }
})

const sortedResults = res.sort((a, b) => {
    return b.averageBits - a.averageBits
})

console.log(sortedResults)