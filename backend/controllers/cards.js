const Card = require('../models/card');

const BAD_REQUEST = 400;
const FORBIDDEN = 403;
const NOT_FOUND = 404;

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new Error('Datos de tarjeta inválidos');
        error.statusCode = BAD_REQUEST;
        return next(error);
      }

      return next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail()
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        const error = new Error('No tienes permiso para eliminar esta tarjeta');
        error.statusCode = FORBIDDEN;
        return Promise.reject(error);
      }

      return card.deleteOne().then(() => res.send(card));
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        const error = new Error('ID de tarjeta no encontrado');
        error.statusCode = NOT_FOUND;
        return next(error);
      }

      if (err.name === 'CastError') {
        const error = new Error('ID de tarjeta inválido');
        error.statusCode = BAD_REQUEST;
        return next(error);
      }

      return next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new Error('ID de tarjeta inválido');
        error.statusCode = BAD_REQUEST;
        return next(error);
      }

      if (err.name === 'DocumentNotFoundError') {
        const error = new Error('ID de tarjeta no encontrado');
        error.statusCode = NOT_FOUND;
        return next(error);
      }

      return next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new Error('ID de tarjeta inválido');
        error.statusCode = BAD_REQUEST;
        return next(error);
      }

      if (err.name === 'DocumentNotFoundError') {
        const error = new Error('ID de tarjeta no encontrado');
        error.statusCode = NOT_FOUND;
        return next(error);
      }

      return next(err);
    });
};
