const routerUser = require('express').Router();
const { postUser } = require('../controllers/users');

// routerUser.get('/users', (req, res) => {
//   res.send(req.query);
// });

// routerUser.get('/users/:userId', (req, res) => {
//   res.send(req.params.userId);
// });

routerUser.post('/users', postUser);

module.exports = routerUser;
