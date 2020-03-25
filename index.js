const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const axios = require('axios');

const jsdom = require('jsdom');
const { JSDOM } = jsdom;

app.get('/', (req, res) => res.send('heuehuehu'));

app.get('/synonyms/:word', (request, response) => {

    let params = request.params;
    let word = params.word.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    axios({
        method: 'GET',
        url: `https://www.sinonimos.com.br/${word}`,
        headers: {'Content-Type': 'text/plain; charset=ISO-8859-1'},
        responseType: 'document',
        responseEncoding: 'latin1'
    })
        .then(res => {

            let dom = new JSDOM(res.data);
            let document = dom.window.document;

            let synonyms = document.querySelectorAll('.s-wrapper .sinonimos a');

            let words = [];

            synonyms.forEach(synonym => {
                words.push(synonym.innerHTML);
            });

            response.json(words);

        })
        .catch(error => {

            response.send('error');
        })

});

app.listen(PORT, () => console.log(`running on port ${PORT}!`));