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

app.get('/get-question-by-id', (req, res) => {
	// req.query
	// get question
});

app.listen(3000, err => {
	if (err) {
		console.log(err);
	} else {
		console.log('Server listen on port 3000 ...');
	}
});
