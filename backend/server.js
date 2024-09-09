const express = require("express");
const app = express();
const cors = require("cors");

//const MongoStore = require("connect-mongo");

require("dotenv").config({ path: "./config.env" });

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET, PUT, POST, DELETE, PATCH, HEAD",
		credentials: true,
		optionsSuccessStatus: 204,
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);

const dbo = require("./database/conn");
app.use(express.json());
const port = process.env.PORT || 4000;

app.listen(port, () => {
	dbo.connectToServer(function (err) {
		if (err) {
			console.err(error);
		}
	});
    console.log(`Server is running on port ${port}`);
});
