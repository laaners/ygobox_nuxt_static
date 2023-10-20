const http = require("http")
const express = require("express")
const cors = require("cors")
const WebSocket = require("ws")

const app = express().use(cors())
const httpServer = http.createServer(app)
const ws = new WebSocket.Server({ server: httpServer })

const port = +process.env.PORT || 8080

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

httpServer.listen(port, function () {
	console.log("In ascolto sulla porta: " + port)
})
