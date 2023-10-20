import WebSocket from 'ws'

const ws = new WebSocket.Server({ port: (+process.env.PORT+1 || 3001) })

export default ws
;(async () => {
	console.log("Start ws")
	const CLIENTS = []
	ws.on("connection", (conn) => {
		CLIENTS.push(conn)
		console.log("Connection opened: " + CLIENTS.length)
		conn.on("message", (message) => {
			console.log("Received message: " + message)
			sendAll()
		})

		conn.on("close", () => {
			CLIENTS.splice(CLIENTS.indexOf(conn), 1)
			console.log("Connection closed: " + CLIENTS.length)
		})
	})

	ws.on("error", (err) => {
		console.log(err)
	})

	function sendAll() {
		console.log("Sending to all")
		CLIENTS.forEach((client) => {
			client.send("Message to all")
		})
	}
})()
