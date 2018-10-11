export default class EventApiClient {
	constructor(url) {
		this.url = url;
	}

	connect() {
		return new Promise((resolve, reject) => {
			console.log('WS Connecting');

			this.socket = new WebSocket(this.url, 'events');

			this.socket.onopen = (event) => {
				console.log('WS Opened', event);
				resolve();
			};

			this.socket.onerror = (event) => {
				console.error('WS Error', event);
				reject(event);
			};
		});
	}

	send(message) {
		return new Promise((resolve, reject) => {
			console.log('WS Sending', message);

			this.socket.onclose = (event) => {
				console.log('WS Closed', event);
				reject(event);
			};

			this.socket.onerror = (event) => {
				console.error('WS Error', event);
				reject(event);
			};

			this.socket.send(JSON.stringify(message));

			console.log('WS Sent');

			return resolve();
		});
	}

	receive() {
		return new Promise((resolve, reject) => {
			console.log('WS Receiving');

			this.socket.onmessage = (event) => {
				console.log('WS Received', event);
				resolve(event);
			};

			this.socket.onclose = (event) => {
				console.log('WS Closed', event);
				reject(event);
			};

			this.socket.onerror = (event) => {
				console.error('WS Error', event);
				reject(event);
			};

			return resolve();
		});
	}
}