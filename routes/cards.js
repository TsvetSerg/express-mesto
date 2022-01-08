const routerCard = require('express').Router();
const { postCards } = require('../controllers/cards');

// routerCard.get('/', );
routerCard.post('/', postCards);
// routerCard.delete('/:cardId', );

module.exports = routerCard;
