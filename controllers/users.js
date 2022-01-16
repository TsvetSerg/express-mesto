const User = require('../models/user');
const NotFoundError = require('../errors/not-found');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const loginError = require('../errors/loginError');

const { JWT_SECRET = 'DEFAULT_JWT' } = process.env;

const postUser = (req, res) => {              // Создаем пользователя
  try {
    const { name, about, avatar, email, password } = req.body;
    bcrypt.hash(req.body.password, 10)
      .then((hash) => {
        const user = User.create({ name, about, avatar, email, password: hash });
        res.status(200).send(user);
      });
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Введены некорректные данные!' });
      return;
    }

    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

const getUser = async (req, res) => {       // Получаем всех пользователей
  try {
    const user = await User.find({});

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

const getUserId = (req, res) => {         // Получаем пользоватея по ID
  const { _id } = req.params;
  User.findById(_id)
    .orFail(() => new NotFoundError('NotFound'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные.' });
      }
      if (err.message === 'NotFound') {
        return res.status(404).send({ message: `Данный id: ${_id} не найден` });
      }

      return res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

const updateProfile = async (req, res) => {           // Обновление профия
  try {
    const { name, about, avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about, avatar },
      { new: true, runValidators: true },
    );
    res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      return;
    }

    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

const updateAvatar = async (req, res) => {              // Обновление аватара
  try {
    const { avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
      return;
    }

    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials({ email, password })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    })
};

const getProfile = (req, res) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError('NotFound'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные.' });
      }
      if (err.message === 'NotFound') {
        return res.status(404).send({ message: `Данный id не найден` });
      }

      return res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

module.exports = {
  postUser,
  getUser,
  getUserId,
  updateProfile,
  updateAvatar,
  login,
  getProfile,
};
