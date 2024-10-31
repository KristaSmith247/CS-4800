const express = require("express");
const crypto = require("crypto"); // used for passwords

// accountRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const accountRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This helps convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

function createAccountId() {
    // create 6-digit account id
    return Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
}


// This section will help you get a list of all the records.
accountRoutes.route("/accounts").get(async (req, res) => {
    try {
        let db_connect = dbo.getDb("languageApp");
        // the following line will return all information about an account except for the password
        const result = await db_connect.collection("accounts")
            .find({})
            .project({ password: 0 })
            .toArray();
        res.json(result);
    } catch (err) {
        throw err;
    }
});

// Login route
accountRoutes.route("/accounts/login").post(async (req, res) => {
    try {
        let db_connect = dbo.getDb();
        let hashedPassword = crypto.createHash('sha256').update(req.body.password).digest('hex');
        let myobj = {
            username: req.body.username,
            password: hashedPassword,
            type: "",
        };
        const checkUserAndPassword = await db_connect
            .collection("accounts")
            .findOne({ username: myobj.username, password: myobj.password });
        if (!checkUserAndPassword) {
            console.log("Error: no user found");
            message = { message: "Error: No user" };
            res.json(message);
        } else {
            message = { message: "Success" };
            res.json(checkUserAndPassword);
        }
    } catch (err) {
        throw err;
    }
});

// This section will help you create a new record.
accountRoutes.route("/accounts/create").post(async (req, res) => {
    try {
        let db_connect = dbo.getDb();
        let hashedPassword = crypto.createHash('sha256').update(req.body.password).digest('hex');
        let accountId = createAccountId();
        let myobj = {
            username: req.body.username,
            password: hashedPassword,
            type: req.body.type,
            accountId: accountId
        };
        const testUsername = await db_connect.collection("accounts").findOne({ username: myobj.username });
        if (testUsername) {
            // if username exists, do not create duplicate account
            res.status(400).json({ message: "Username is already in use" });
        } else {
            // return success message
            const result = db_connect.collection("accounts").insertOne(myobj);
            console.log("Created an account");
            res.status(201).json({ message: "Account created", user: result.ops[0] });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login route
accountRoutes.route("/accounts/login").post(async (req, res) => {
    try {
        let db_connect = dbo.getDb();
        let myobj = {
            username: req.body.username,
            password: req.body.password,
            type: "",
        };
        const checkUserAndPassword = await db_connect
            .collection("accounts")
            .findOne({ username: myobj.username, password: myobj.password });
        if (!checkUserAndPassword) {
            console.log("Error: no user found");
            message = { message: "Error: No user" };
            res.json(message);
        } else {
            message = { message: "Success" };
            res.json(checkUserAndPassword);
        }
    } catch (err) {
        throw err;
    }
});

// Fetch single account by id
accountRoutes.route("/accounts/:id").get(async (req, res) => {
    try {
        let db_connect = dbo.getDb();
        let myquery = { _id: new ObjectId(req.params.id) };
        const result = await db_connect.collection("accounts").findOne(myquery);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = accountRoutes;
