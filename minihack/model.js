const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  players: [String],
  scores: [[Number]],
}, {
  timestamps: true,
});

const GameModel = mongoose.model('Game', GameSchema);

module.exports = GameModel;