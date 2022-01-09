const routerUser = require('express').Router();
const { postUser, getUser, getUserId, updateProfile, updateAvatar } = require('../controllers/users');

routerUser.get('/', getUser);
routerUser.get('/:_id', getUserId);
routerUser.post('/', postUser);
routerUser.patch('/me', updateProfile);
routerUser.patch('/me/avatar', updateAvatar);

module.exports = routerUser;
