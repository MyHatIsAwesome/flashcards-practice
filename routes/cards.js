const express = require('express');
const router = express.Router();

const { data } = require('../data/flashcardData.json');
const { cards } = data;

router.get('/', (req, res) => res.redirect(`/cards/${Math.floor(Math.random() * cards.length)}`));

router.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    const side = req.query.side || "question";
    const card = cards[id];

    if (card) {
        const text = card[side];
        const nextCardUrl = `/cards/${(id+1)%cards.length}`;
        const templateData = { text, nextCardUrl };
        templateData.name = req.cookies.username;

        if (side === 'question') {
            templateData.hint = card.hint;
            templateData.actionUrl = `/cards/${id}?side=answer`;
            templateData.actionText = 'Show Answer';
        } else {
            templateData.actionUrl = `/cards/${id}?side=question`;
            templateData.actionText = 'Show Question';
        }

        res.render('card', templateData);
    } else {
        let err = new Error(`Card with Id=${id} not found.`);
        err.status = 422;
        next(err);
    }
});

module.exports = router;