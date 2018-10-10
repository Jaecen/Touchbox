let socket = null;

export function init(url) {
	console.log('connecting');
	socket = new WebSocket(url, 'events');

	console.log(socket);

	socket.onmessage = ev => {
		console.log('message', ev);
	};

	socket.onerror = ev => {
		console.log('error', ev);
		console.error(ev);
	};

	socket.onopen = ev => {
		console.log('opened', ev);
	};

	socket.onclose = ev => {
		console.log('closed', ev);
	};
}

export function sendMessage(message) {
	console.log('sending');
	socket.send(JSON.stringify(message));
	console.log('sent');
}