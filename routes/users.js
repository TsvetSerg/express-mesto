const routerUser = require('express').Router();
const { postUser, getUser, getUserId } = require('../controllers/users');

routerUser.get('/', getUser);

routerUser.get('/:_id', getUserId);

routerUser.post('/', postUser);

module.exports = routerUser;
