const express = require('express');
const path = require('path');

const app = express();
app.use(express.static('public'));

app.get('/ask', (req, res) => {
	// __dirname: current working directory
	res.sendFile(path.resolve(__dirname, './public/ask.html'));
});

app.listen(3000, err => {
	if (err) {
		console.log(err);
	} else {
		console.log('Server listen on port 3000 ...');
	}
});
