const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        const regex = /https?:\/\/(\w{3}.)?[0-9a-z\-.]{1,}\.\w{1,}((\/[a-z0-9-._~:?#[\]@!$&'()*+,;=]{1,}){1,}\/?#?)?/i;

        return regex.test(link);
      },
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        const regex = /https?:\/\/(\w{3}.)?[0-9a-z\-.]{1,}\.\w{1,}((\/[a-z0-9-._~:?#[\]@!$&'()*+,;=]{1,}){1,}\/?#?)?/i;

        return regex.test(link);
      },
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        const regex = /https?:\/\/(\w{3}.)?[0-9a-z\-.]{1,}\.\w{1,}((\/[a-z0-9-._~:?#[\]@!$&'()*+,;=]{1,}){1,}\/?#?)?/i;

        return regex.test(link);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('movie', movieSchema);
