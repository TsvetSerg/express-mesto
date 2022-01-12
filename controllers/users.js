const User = require('../models/user');
const NotFoundError = require('../errors/not-found');

const postUser = async (req, res) => {              // Создаем пользователя
  try {
    const { name, about, avatar } = req.body;

    const user = await User.create({ name, about, avatar });

    res.status(200).send(user);
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

module.exports = {
  postUser,
  getUser,
  getUserId,
  updateProfile,
  updateAvatar,
};
