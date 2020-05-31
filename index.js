const express = require('express');
const Datastore = require('nedb');
const app = express();

app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

app.post('/api/newuser', (request, response) => {
	const data = request.body;
	let isInDB = false;
	database.find(data, (err, docs) => {
		if (docs.length > 0) {
			isInDB = true;
		}
		response.json(isInDB);
	});
});

app.post('/api/newlog', (request, response) => {
	const data = request.body;
	database.insert(data);
	response.json(data);
});

app.post('/api/getlogs', (request, response) => {
	const data = request.body;
	database.find(data, (err, docs) => {
		response.json(docs);
	});
});
