const routerCard = require('express').Router();
const { postCards, getCards, deleteCards, likedCards, dislikeCards } = require('../controllers/cards');

routerCard.get('/', getCards);
routerCard.post('/', postCards);
routerCard.delete('/:_id', deleteCards);
routerCard.put('/:_id/likes', likedCards);
routerCard.delete('/:_id/likes', dislikeCards);

module.exports = routerCard;
