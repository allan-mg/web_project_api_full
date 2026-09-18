require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');

const errorHandler = require('./middlewares/error-handler');
const { validateSignup, validateSignin } = require('./middlewares/validation');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(cors());
app.use(express.json());

// Registrar todas las solicitudes
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('El servidor va a caer');
  }, 0);
});

// Rutas públicas
app.post('/signin', validateSignin, login);
app.post('/signup', validateSignup, createUser);

// A partir de aquí, las rutas requieren autorización
app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

// Ruta inexistente
app.use((req, res, next) => {
  const error = new Error('Recurso solicitado no encontrado');
  error.statusCode = 404;

  next(error);
});

// Errores de Celebrate
app.use(errors());

// Registrar los errores
app.use(errorLogger);

// Manejo centralizado de errores
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
