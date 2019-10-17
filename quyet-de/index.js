const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

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

app.post('/create-question', (req, res) => {
	// id
	// content
	// like
	// dislike
	const newQuestion = {
		id: new Date().getTime(),
		content: req.body.questionContent,
		like: 0,
		dislike: 0,
	};

	// read data + convert json => array
	fs.readFile('data.json', (err, data) => {
		if (err) {
			res.status(500).json({
				success: false,
				message: err.message,
			});
		} else {
			const questions = JSON.parse(data);

			// push new question
			questions.push(newQuestion);

			// convert array => json + write new data
			fs.writeFile('data.json', JSON.stringify(questions), (error) => {
				if (error) {
					res.status(500).json({
						success: false,
						message: error.message,
					});
				} else {
					res.json({
						success: true,
						data: newQuestion,
					});
				}
			});
		}
	});
});

app.get('/get-question-by-id/:questionId', (req, res) => {
	const questionId = req.params.questionId;

	fs.readFile('data.json', 'utf8', (err, data) => {
		if (err) {
			res.status(500).json({
				success: false,
				message: err.message,
			});
		} else {
			const questions = JSON.parse(data);
			let selectedQuestion;
			for (let i = 0; i < questions.length; i += 1) {
				if (questions[i].id === Number(questionId)) {
					selectedQuestion = questions[i];
					break;
				}
			}

			if (!selectedQuestion) {
				res.status(404).json({
					success: false,
					message: 'Question not found',
				});
			} else {
				res.status(200).json({
					success: true,
					data: selectedQuestion,
				});
			}
		}
	});
});

app.get('/get-random-question', (req, res) => {
	fs.readFile('data.json', 'utf8', (err, data) => {
		if (err) {
			res.status(500).json({
				success: false,
				message: err.message,
			});
		} else {
			const questions = JSON.parse(data);
			const randomQuestion = questions[Math.floor(Math.random() * questions.length)];

			res.status(200).json({
				success: true,
				data: randomQuestion,
			});
		}
	});
});

app.put('/vote', (req, res) => {
	const questionId = req.body.questionId;
	const vote = req.body.vote;

	fs.readFile('data.json', 'utf8', (err, data) => {
		if (err) {
			res.status(500).json({
				success: false,
				message: err.message,
			});
		} else {
			const questions = JSON.parse(data);
			for (const item of questions) {
				if (item.id === Number(questionId)) {
					vote === 'like' ? item.like += 1 : item.dislike += 1;
					break;
				}
			}

			fs.writeFile('data.json', JSON.stringify(questions), (error) => {
				if (error) {
					res.status(500).json({
						success: false,
						message: err.message,
					});
				} else {
					res.status(200).json({
						success: true,
					});
				}
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
