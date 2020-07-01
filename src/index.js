const express = require('express');
const bodyParser = require('body-parser');
const usersController = require('./controllers/users');

const port = 8000;
const app = express();
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Servidor ligado. Acesse em  http://localhost:${port}`);
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

// Endpoints
app.post('/api/create-user', usersController.createUser);
app.get('/api/auth', usersController.verifyUser);