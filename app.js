const PORT = 3000;
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('view engine', 'pug');

app.use(require('./routes'));
app.use('/cards', require('./routes/cards'));

app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).render('error', {
        error: err
    });
});

app.listen(PORT, () => console.log(`Express server running on http://localhost:${PORT}`));