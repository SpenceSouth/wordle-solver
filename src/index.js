const validAnswers = require('./data/possible-values.json')
const validGuess = require('./data/valid-guess.json')
const { evaluate } = require('./utils/operations')

// Need to build a model that calculates which guess would give us the most information

// Calculate Entrophy of any given word

let res = evaluate('salet', '00000')
res = evaluate('groin', '00020', res.remainingAnswers)
res = evaluate('humid', '00022', res.remainingAnswers)
// res = evaluate('conic', '20222', res.remainingAnswers)
console.log(res)