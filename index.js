const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => res.send('heuehuehu'));

app.listen(PORT, () => console.log(`running on port ${PORT}!`));