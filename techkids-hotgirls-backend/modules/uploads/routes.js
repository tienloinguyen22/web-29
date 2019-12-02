const express = require('express');
const multer = require('multer');

const uploadsRouter = express.Router();
const upload = multer({
  dest: 'public/',
});

uploadsRouter.post('/image', upload.single('image'), async (req, res) => {
  console.log(req.file);

  // validate: file type + file size

  // resize

  // rename file

  res.status(201).json({
    success: true,
    data: {
      imageUrl: '',
    },
  });
});

module.exports = uploadsRouter;