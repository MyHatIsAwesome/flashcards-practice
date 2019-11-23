const PORT = 3000;
const express = require('express');

const app = express();

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/cards', (req, res) => {
    res.render('cards', {
        prompt: "Who is buried in Grant's Tomb?",
        hint: "Think about who's tomb it is."
    });
});

app.listen(PORT, () => console.log(`Express server running on http://localhost:${PORT}`));