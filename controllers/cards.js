// module.exports.createCard = (req, res) => {
//   console.log(req.user._id);
// };

const Card = require('../models/card');

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

module.exports = {
  postCards,
};
