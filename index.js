const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => res.send('heuehuehu'));

app.listen(port, () => console.log(`running on port ${port}!`));