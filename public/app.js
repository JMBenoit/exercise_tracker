function $(value) {
	return document.getElementById(value);
}

$('newUserSubmit').addEventListener('click', async () => {
	const username = $('newUsername').value;
	const newUser = { username };
	const options = {
		method  : 'POST',
		headers : {
			'Content-Type' : 'application/json'
		},
		body    : JSON.stringify(newUser)
	};
	const response = await fetch('/api/newuser', options);
	const isInDB = await response.json();

	if (isInDB) {
		$('newUserFeedback').innerText = 'Username is already in use. Please try a different username.';
	} else {
		$('newUserFeedback').innerText = 'Username is available.';
	}
});

$('newExerciseSubmit').addEventListener('click', async () => {
	const username = $('username').value;
	const description = $('description').value;
	const duration = $('duration').value;
	const date = $('date').value || Date.now();
	const data = { username, description, duration, date };
	const options = {
		method  : 'POST',
		headers : {
			'Content-Type' : 'application/json'
		},
		body    : JSON.stringify(data)
	};
	const response = await fetch('/api/newlog', options);
	const json = await response.json();
	if (json != null) {
		const dateStr = new Date(json.date).toDateString();
		$(
			'newExerciseFeedback'
		).innerText = `New exercise added. Username: ${json.username}, Description: ${json.description}, Duration: ${duration}, Date: ${dateStr}`;
	}
});

$('getLogsSubmit').addEventListener('click', async () => {
	$('getLogsFeedback').textContent = '';
	const username = $('getLogsUsername').value;
	const checkUser = { username };
	const options = {
		method  : 'POST',
		headers : {
			'Content-Type' : 'application/json'
		},
		body    : JSON.stringify(checkUser)
	};
	const response = await fetch('/api/getlogs', options);
	const data = await response.json();

	const header = document.createElement('div');
	$('getLogsFeedback').append(header);
	for (item of data) {
		const br = document.createElement('br');
		const br2 = document.createElement('br');
		const description = document.createElement('div');
		const duration = document.createElement('div');
		const date = document.createElement('div');

		header.textContent = `Logs for ${username}`;
		description.textContent = `Description: ${item.description}`;
		duration.textContent = `Duration: ${item.duration}`;
		const dateStr = new Date(item.date).toDateString();

		$('getLogsFeedback').append(br, description, duration, dateStr, br2);
	}
});
