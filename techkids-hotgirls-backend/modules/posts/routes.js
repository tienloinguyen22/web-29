const express = require('express');
const joi = require('@hapi/joi');
const PostModel = require('./model');

const postRouter = express.Router();

postRouter.get('/:id', async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({
      success: false,
      message: 'Bad request',
    })
  } else {
    const post = await PostModel.findById(req.params.id)
      .populate('author', 'email fullName createdAt')
      .lean();

    res.status(200).json({
      success: true,
      data: post,
    });
  }
});

postRouter.get('/', async (req, res) => {
  try {
    const pageNumber = Number(req.query.pageNumber);
    const pageSize = Number(req.query.pageSize);

    const total = await PostModel.find().countDocuments();
    const data = await PostModel.find()
      .populate('author')
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .lean();

    res.status(200).json({
      success: true,
      total: total,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

postRouter.post('/', async (req, res) => {
  // authenticate
  if (!req.session.currentUser) {
    res.status(401).json({
      success: false,
      message: 'Unauthenticated'
    });
  } else {
    // validate
    const bodyValidation = joi.object({
      content: joi.string()
        .required()
        .min(5)
        .max(1000)
        .error(() => {
          return new Error('Invalid post content');
        }),
      imageUrl: joi.string()
        .required()
        .error(() => {
          return new Error('Invalid image url');
        }),
    });
    const validateResult = bodyValidation.validate(req.body);
    if (validateResult.error) {
      res.status(400).json({
        success: false,
        message: validateResult.error.message,
      });
    } else {
      // save db
      const newPostInfo = {
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        author: req.session.currentUser._id,
      };
      const newPost = await PostModel.create(newPostInfo);
      res.status(201).json({
        success: true,
        data: newPost,
      });
    }
  }
});

module.exports = postRouter;