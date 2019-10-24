const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const QuestionsModel = require('./model');

mongoose.connect('mongodb://localhost:27017/quyet-de-web29', {
	useNewUrlParser: true,
}, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log('Connect to mongodb success');

		const app = express();
		app.use(express.static('public'));
		app.use(bodyParser.json());

		// Get data => GET
		// Create data => POST
		// Edit data => PUT/PATCH
		// Delete data => DELETE

		app.get('/', (req, res) => {
			// __dirname: current working directory
			res.sendFile(path.resolve(__dirname, './public/home.html'));
		});

		app.get('/ask', (req, res) => {
			// __dirname: current working directory
			res.sendFile(path.resolve(__dirname, './public/ask.html'));
		});

		app.get('/questions/:questionId', (req, res) => {
			// params
			res.sendFile(path.resolve(__dirname, './public/questions.html'));
		});

		app.get('/search', (req, res) => {
			// __dirname: current working directory
			res.sendFile(path.resolve(__dirname, './public/search.html'));
		});

		app.post('/create-question', (req, res) => {
			const newQuestion = {
				content: req.body.questionContent,
			};
			QuestionsModel.create(newQuestion, (error, data) => {
				if (error) {
					res.status(500).json({
						success: false,
						message: error.message,
					});
				} else {
					res.status(201).json({
						success: true,
						data: {
							id: data._id,
							content: data.content,
							like: data.like,
							dislike: data.dislike,
						},
					});
				}
			});
		});

		app.get('/get-question-by-id/:questionId', (req, res) => {
			const questionId = req.params.questionId;

			QuestionsModel.findById(questionId, (error, data) => {
				if (error) {
					res.status(500).json({
						success: false,
						message: error.message,
					});
				} else if (!data) {
					res.status(404).json({
						success: false,
						message: 'Question not found',
					});
				} else {
					res.status(200).json({
						success: true,
						data: {
							id: data._id,
							content: data.content,
							like: data.like,
							dislike: data.dislike,
						},
					});
				}
			});
		});

		app.get('/get-random-question', (req, res) => {
			QuestionsModel.aggregate([{$sample: {size: 1}}], (error, datas) => {
				if (error) {
					res.status(500).json({
						success: false,
						message: error.message,
					});
				} else if (!datas[0]) {
					res.status(404).json({
						success: false,
						message: 'Question not found',
					});
				} else {
					res.status(200).json({
						success: true,
						data: {
							id: datas[0]._id,
							content: datas[0].content,
							like: datas[0].like,
							dislike: datas[0].dislike,
						},
					});
				}
			});
		});

		app.put('/vote', (req, res) => {
			const questionId = req.body.questionId;
			const vote = req.body.vote;

			QuestionsModel.findOne({_id: questionId}, (error, data) => {
				if (error) {
					res.status(500).json({
						success: false,
						message: error.message,
					});
				} else if (!data) {
					res.status(404).json({
						success: false,
						message: 'Question not found',
					});
				} else {
					QuestionsModel.findByIdAndUpdate(questionId, {$inc: vote === 'like' ? {like: 1} : {dislike: 1}}, (e) => {
						if (e) {
							res.status(500).json({
								success: false,
								message: error.message,
							});
						} else {
							res.status(500).json({
								success: true,
							});
						}
					});
				}
			});
		});

		app.get('/search-questions', (req, res) => {
			const searchValue = req.query.search;

			QuestionsModel.find({content: {$regex: searchValue, $options: 'i'}}, (error, datas) => {
				if (error) {
					res.status(500).json({
						success: false,
						message: error.message,
					});
				} else {
					res.status(200).json({
						success: true,
						data: datas,
					});
				}
			});
		});

		app.listen(3000, err => {
			if (err) {
				console.log(err);
			} else {
				console.log('Server listen on port 3000 ...');
			}
		});
	}
});
