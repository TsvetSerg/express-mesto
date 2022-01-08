const User = require('../models/user');

const postUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;

    const user = await User.create({ name, about, avatar });

    res.status(200).send(user);
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

const getUser = async (req, res) => {
  try {
    const user = await User.find({});

    res.status(200).send(user);
  } catch (err) {
    console.log(`ERROR: ${err.name}`);
    console.log(`ERROR: ${err.message}`);

    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

const getUserId = async (req, res) => {
  const { _id } = req.params;

  try {
    const user = await User.findById(_id)

    res.status(200).send(user);
  } catch (err) {
    console.log(`ERROR: ${err.name}`);
    console.log(`ERROR: ${err.message}`);

    if (err.name === 'ValidationError') {
      res.status(400).send({ message: `Данный id: ${_id} не найден` });
      return;
    }

    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

module.exports = {
  postUser,
  getUser,
  getUserId,
};
