const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send('I will eat your soul')
})

app.listen(8000, () => {
    console.log('listening to your soul')
})

app.get('/burgers', (req, res) => {
    res.send('we has juicy cheesburgers')
})

app.get('/pizza', (req, res) => {
    res.send('Your pizza has no soul')
})

app.get('/pizza/pinapple', (req, res) => {
    res.send('That topping is illegal')
})

app.get('/echo', (req, res) => {
    const requestInfo = `Here are some details of your request
        BaseURL: ${req.baseUrl}
        Host: ${req.host}
        Path: ${req.path}
        IP: ${req.ip}`;
    res.send(requestInfo)
})

app.get('/query', (req, res) => {
    console.log(req.query)
    res.end()
})

app.get('/nameandrace', (req, res) => {
    const name = req.query.name;
    const race = req.query.race;

    if (!name) {
        return res.status(400).send('Please provide a name')
    }
    if (!race) {
        return res.status(400).send('Please provide a race')
    }

    const nameRace = `${name}: ${race} is awesome`;

    res.send(nameRace)
})

app.get('/sum', (req, res) => {
    const a = parseInt(req.query.a)
    const b = parseInt(req.query.b)

    const sumString = `the sum of ${a} + ${b} is ${a+b}`

    res.send(sumString);
})

app.get('/cypher', (req, res) => {
    const newText = req.query.text.split('')
        .map(letter => {
            letter = letter.charCodeAt(0)+parseInt(req.query.shift)
            console.log(letter)
            if (letter === 123) {
                return 97
            }
            if (letter === 91) {
                return 65
            }
            return letter
        })
        .map(letter => String.fromCharCode(letter))
        .join('');
    console.log(newText);
    res.send(newText)
})

app.get('/lotto', (req, res) => {

    const lotoNumbers = req.query.arr.map(number => parseInt(number))
    lotoNumbers.filter(number => {
        number <= 20 && number >= 0
    })

    if (!lotoNumbers || lotoNumbers !== 6) {
        return res.status(400).send('Please send 6 numbers between 0-20')
    }

    console.log(lotoNumbers)
    let answer = [... new Array (6)].map(()=>{
        return Math.floor(Math.random() * 20)
    })
    answer = answer.filter(number => {
        console.log('number', number)
        return lotoNumbers.includes(number)
    })
    console.log(answer)
    if (answer.length <= 4) {
        res.send(`You did terrible and got ${answer.length} correct`)
    }
    if (answer.length === 5) {
        res.send('Congratulations! You win $100!')
    }
    if (answer.length === 6) {
        res.send('Wow! Unbelievable! You could have won the mega millions!')
    }
})