const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');
const { postUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth')

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});


app.post('/signin', login);
app.post('/signup', postUser);

// app.use(auth);

app.use(routes);
app.use(express.json());

app.listen(PORT);
