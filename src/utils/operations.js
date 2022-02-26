const validAnswers = require('../data/possible-values.json')
const { states } = require('../utils/states')

function entrophy(previousMax, postMax) {
    let value = 0

    let res = previousMax / 2
    while (res > postMax) {
        value += 1
        res = res / 2
    }

    value += res / postMax

    return value
}

// We know the exact letter and position at X index
function case2(guess, position, remainingAnswers) {
    const possibleAnswers = remainingAnswers.filter(x => x.charAt(position) === guess.charAt(position))
    return possibleAnswers
}

// We know the letter is in a word and NOT at X index
function case1(guess, position, remainingAnswers) {
    const possibleAnswers = remainingAnswers.filter(x => {
        return x.charAt(position) !== guess.charAt(position)
            && x.includes(guess.charAt(position))
    })
    return possibleAnswers
}

// We know the letter is not in the word
function case0(guess, position, remainingAnswers) {
    const possibleAnswers = remainingAnswers.filter(x => {
        return !x.includes(guess.charAt(position))
    })
    return possibleAnswers
}

function caseX(state) {
    if (state === '0') {
        return case0
    } else if (state === '1') {
        return case1
    } else {
        return case2
    }
}

function evaluate(guess, state, remainingAnswers = validAnswers, determineNextGuess = true) {
    let result = caseX(state.charAt(0))(guess, 0, remainingAnswers)
    result = caseX(state.charAt(1))(guess, 1, result)
    result = caseX(state.charAt(2))(guess, 2, result)
    result = caseX(state.charAt(3))(guess, 3, result)
    result = caseX(state.charAt(4))(guess, 4, result)


    if (determineNextGuess) {
        const res = result.map(guess => {
            let bitSum = 0
        
            for (let state of states) {
                const evaluation = evaluate(guess, state, remainingAnswers, false)
        
                if (evaluation.bits) {
                    bitSum += evaluation.bits
                }
            }
        
            return {
                word: guess,
                averageBits: bitSum / remainingAnswers.length
            }
        })

        const sortedResults = res.sort((a, b) => {
            return b.averageBits - a.averageBits
        })

        return {
            remainingAnswers: result,
            bits: entrophy(remainingAnswers.length, result.length),
            guess: guess,
            state: state,
            nextGuess: sortedResults
        }
    }

    return {
        remainingAnswers: result,
        bits: entrophy(remainingAnswers.length, result.length),
        guess: guess,
        state: state
    }
}

module.exports = {
    case0,
    case1,
    case2,
    evaluate
}