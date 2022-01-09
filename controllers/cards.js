// module.exports.createCard = (req, res) => {
//   console.log(req.user._id);
// };

const Card = require('../models/card');
const mongoose = require('mongoose');

const postCards = async (req, res) => {
  const { name, link } = req.body;
  try {
    const card = await Card.create({ name, link, owner: req.user._id });
    res.status(200).send(card);
  } catch (err) {
    console.log(`ERROR: ${err.name}`);
    console.log(`ERROR: ${err.message}`);

    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Введены некорректные данные!' });
      return;
    }

    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

const getCards = async (req, res) => {
  try {
    const card = await Card.find({});

    res.status(200).send(card);
  } catch (err) {
    console.log(`ERROR: ${err.name}`);
    console.log(`ERROR: ${err.message}`);

    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};
const deleteCards = async (req, res) => {
  try {
    const { _id } = req.params;

    const card = await Card.findByIdAndRemove(_id);
    res.status(200).send(card);
  } catch (err) {
    console.log(`ERROR: ${err.name}`);
    console.log(`ERROR: ${err.message}`);

    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Данный id не найден' });
      return;
    }

    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

const likedCards = (req, res) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((like) => res.status(200).send({ data: like }))
    .catch((err) => {
      if (err.message === '404') {
        return res.status(404).send({ message: 'Карточка не найдена!' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Ошибка передачи' });
      }
      return res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

const dislikeCards = (req, res) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((dislike) => res.status(200).send({ data: dislike }))
    .catch((err) => {
      if (err.message === '404') {
        return res.status(404).send({ message: 'Карточка не найдена!' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Ошибка передачи' });
      }
      return res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

module.exports = {
  postCards,
  getCards,
  deleteCards,
  likedCards,
  dislikeCards,
};
