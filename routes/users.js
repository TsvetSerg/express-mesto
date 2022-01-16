const routerUser = require('express').Router();
const {
  postUser,
  getUser,
  getUserId,
  updateProfile,
  updateAvatar,
  getProfile,
} = require('../controllers/users');


routerUser.get('/', getUser);   // Получить всех пользователлей
routerUser.get('/:_id', getUserId);   // Получить пользователя по ID
// routerUser.post('/', postUser);   // Создать нового пользоватея
routerUser.patch('/me', updateProfile);   // Обновление пользователя
routerUser.patch('/me/avatar', updateAvatar);   // обновениие аватара
routerUser.get('/me', getProfile);

module.exports = routerUser;
