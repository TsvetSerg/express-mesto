const Card = require('../models/card');
const mongoose = require('mongoose');

const postCards = async (req, res) => {         //Создаем картооочку
  const { name, link } = req.body;
  try {
    const card = await Card.create({ name, link, owner: req.user._id });
    res.status(200).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Переданы некорректные данные при создании карточки.' });
      return;
    }

    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

const getCards = async (req, res) => {        //Получаем все картоки с сервера
  try {
    const card = await Card.find({});

    res.status(200).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: 'Переданы некорректные данные при создании карточки.' });
      return;
    }
    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};
const deleteCards = async (req, res) => {       //Удаляем карточку
  try {
    const { _id } = req.params;

    const card = await Card.findByIdAndRemove(_id);
    res.status(200).send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(404).send({ message: 'Карточка с указанным id не найдена.' });
      return;
    }

    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

const likedCards = (req, res) => {                //Лайк на карточку
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((like) => res.status(200).send({ data: like }))
    .catch((err) => {
      if (err.message === '404') {
        return res.status(404).send({ message: 'Передан несуществующий id карточки.' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные для постановки/снятии лайка.' });
      }
      return res.status(500).send({ message: 'Ошибка на сервере' });
    });
};

const dislikeCards = (req, res) => {              // Удаяем лайк
  Card.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((dislike) => res.status(200).send({ data: dislike }))
    .catch((err) => {
      if (err.message === '404') {
        return res.status(404).send({ message: 'Передан несуществующий id карточки.' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные для постановки/снятии лайка.' });
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
