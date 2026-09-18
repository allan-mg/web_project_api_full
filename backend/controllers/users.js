const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const CONFLICT = 409;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        const error = new Error('Usuario no encontrado');
        error.statusCode = NOT_FOUND;
        return next(error);
      }

      if (err.name === 'CastError') {
        const error = new Error('ID de usuario inválido');
        error.statusCode = BAD_REQUEST;
        return next(error);
      }

      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        const error = new Error('Correo electrónico o contraseña incorrectos');
        error.statusCode = UNAUTHORIZED;
        return Promise.reject(error);
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          const error = new Error(
            'Correo electrónico o contraseña incorrectos',
          );
          error.statusCode = UNAUTHORIZED;
          return Promise.reject(error);
        }

        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
          { expiresIn: '7d' },
        );

        return res.send({ token });
      });
    })
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        const error = new Error('ID de usuario no encontrado');
        error.statusCode = NOT_FOUND;
        return next(error);
      }

      if (err.name === 'CastError') {
        const error = new Error('ID de usuario inválido');
        error.statusCode = BAD_REQUEST;
        return next(error);
      }

      return next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      const userData = user.toObject();
      delete userData.password;

      return res.status(201).send(userData);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new Error('Datos de usuario inválidos');
        error.statusCode = BAD_REQUEST;
        return next(error);
      }

      if (err.code === 11000) {
        const error = new Error(
          'Ya existe un usuario con este correo electrónico',
        );
        error.statusCode = CONFLICT;
        return next(error);
      }

      return next(err);
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new Error('Datos de usuario inválidos');
        error.statusCode = BAD_REQUEST;
        return next(error);
      }

      if (err.name === 'DocumentNotFoundError') {
        const error = new Error('ID de usuario no encontrado');
        error.statusCode = NOT_FOUND;
        return next(error);
      }

      if (err.name === 'CastError') {
        const error = new Error('ID de usuario inválido');
        error.statusCode = BAD_REQUEST;
        return next(error);
      }

      return next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new Error('Avatar inválido');
        error.statusCode = BAD_REQUEST;
        return next(error);
      }

      if (err.name === 'DocumentNotFoundError') {
        const error = new Error('ID de usuario no encontrado');
        error.statusCode = NOT_FOUND;
        return next(error);
      }

      if (err.name === 'CastError') {
        const error = new Error('ID de usuario inválido');
        error.statusCode = BAD_REQUEST;
        return next(error);
      }

      return next(err);
    });
};
