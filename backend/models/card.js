const mongoose = require('mongoose');

const { Schema } = mongoose;

const urlRegex = /^https?:\/\/(?:www\.)?[\w.-]+(?:\.[\w.-]+)+(?:\/[\w._~:/?%#[\]@!$&'()*+,;=-]*)?$/;

const cardSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (value) => urlRegex.test(value),
      message: 'Debes ingresar una URL válida',
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
