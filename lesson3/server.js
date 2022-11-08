const express = require('express');
const { contentType } = require('express/lib/response');
const app = express();
const path = require('path')


// app.get('/helo/:id', (req, res) => {
//     res.send('Hello ' + req.params.id)
//     console.log(res);
// })

// app.get('/hello/:person', (req, res) => {
//     res.send('name :' + req.params.person)
//     console.log(res);
// })

// app.get('/api', (req, res) => {
//     res.sendFile('./index.html', { root: path.join(__dirname) })
//     console.log(res, './index.html')
// })

// app.get('/status/err', (req, res) => {
//     res.sendStatus(204, 'sory')
//     console.log(res);
// })

// app.get('/hel+0/:id', (req, res) => {
//     res.send('Hello ' + req.params.id)
//     console.log(res);
// })

// app.get('/hell?o/:id', (req, res) => {
//     res.send('hell?o/:id')
// })
//user:password
app.use((req, res, next) => {
    if (req.header('Authorization') !== 'Basic dXNlcjpwYXNzd29yZA==') {
        res.header('WWW-Authenticate', 'Basic')
        res.sendStatus(401)
    } else {
        next()
    }
})

app.use((req, res, next) => {
    console.log(new Date().toISOString());
    next()
})

app.get('/person', (req, res) => res.send({ name: 'Ivan' })
)

app.listen(3000, () => console.log('server started 3000'))



