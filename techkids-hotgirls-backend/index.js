const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRouter = require('./modules/auth/routes');
const postRouter = require('./modules/posts/routes');
const uploadsRouter = require('./modules/uploads/routes');
const expressSession = require('express-session');

mongoose.connect('mongodb://localhost:27017/techkids-hotgirls', (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Connect to mongodb success ...');

    const server = express();

    // middlewares
    server.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(expressSession({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }
    }));
    server.use(express.static('public'));

    // routes
    server.use('/api/auth', authRouter);
    server.use('/api/posts', postRouter);
    server.use('/api/uploads', uploadsRouter);

    // listen
    server.listen(process.env.PORT || 3001, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Server listen on port ${process.env.PORT || 3001} ...`);
      }
    });
  }
});