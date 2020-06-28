const express = require('express');
const bodyParser = require('body-parser');
const usersController = require('./controllers/users');

const app = express();
app.use(bodyParser.json());
const port = 8080;

app.listen(port, () => {
    console.log(`Servidor ligado. Acesse em  http://localhost:${port}`);
});

// Endpoints
app.post('/api/create-user', usersController.createUser);
app.get('/api/auth', usersController.verifyUser);