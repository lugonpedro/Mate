// express = framework que ajuda a manusear o node.js
const express = require('express');

const app = express();

app.get('/', (request, response) => {
    return response.send('Olá Mundo');
})

app.listen(3333);