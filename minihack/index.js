const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const GameModel = require('./model');

mongoose.connect('mongodb://localhost:27017/minihack-web29', (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Connect to mongodb success');
    const app = express();

    // middlewares
    app.use(express.static('public'));
    app.use(bodyParser.json());
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });

    // routes
    app.get('/', (req, res) => {
      res.sendFile(path.resolve(__dirname, './public/html/create-game.html'));
    });

    app.get('/games/:id', (req, res) => {
      res.sendFile(path.resolve(__dirname, './public/html/game-scores.html'));
    });

    app.post('/create-game', (req, res) => {
      const newGame = {
        players: req.body.players,
        scores: [],
      };
      GameModel.create(newGame, (err, data) => {
        if (err) {
          res.status(500).json({
            success: false,
            message: err.message,
          });
        } else {
          res.status(201).json({
            success: true,
            data: data,
          });
        }
      });
    });

    app.get('/get-game-by-id', async (req, res) => {
      const gameId = req.query.id;

      // get question
      try {
        const game = await GameModel.findById(gameId).lean();
        res.status(200).json({
          success: true,
          data: game,
        });
      } catch (err) {
        // error happen
        res.status(500).json({
          success: false,
          message: err.message,
        });
      }
    });

    app.put('/update-scores', async (req, res) => {
      try {
        const updateKey = `scores.${req.body.row}.${req.body.col}`;
        await GameModel.findByIdAndUpdate(req.body.id, {$set: {[updateKey]: req.body.score}}).lean();
        res.status(200).json({
          success: true,
        });
      } catch (err) {
        res.status(500).json({
          success: false,
          message: err.message,
        });
      }
    });

    app.put('/add-round', async (req, res) => {
      try {
        await GameModel.findByIdAndUpdate(req.body.id, {$push: {scores: [0, 0, 0, 0]}}).lean();
        res.status(200).json({
          success: true,
        });
      } catch (err) {
        res.status(500).json({
          success: false,
          message: err.message,
        });
      }
    });

    // listen
    app.listen(3001, (err) => {
      if (err) {
        console.log();
      } else {
        console.log('Server listen on port 3001 ...');
      }
    });
  }
});