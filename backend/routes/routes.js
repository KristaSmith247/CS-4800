
const express = require("express");

const accountRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../database/conn");

// This helps convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
accountRoutes.route("/accounts").get(async (req, res) => {
    try {
        let db_connect = dbo.getDb("language-app");
        // the following line will return all information about an account except for the password
        const result = await db_connect.collection("accounts").find({}).project({ password: 0 }).toArray();
        res.json(result);
    } catch (err) {
        throw err;
    }
});


// This section will help you create a new record.
accountRoutes.route("/accounts/create").post(async (req, res) => {
    try {
        let db_connect = dbo.getDb();
        // verify if email already in database
        let testEmail = await db_connect.collection("accounts").findOne({ username: req.body.username });
        let testPassword = await db_connect.collection("accounts").findOne({ password: req.body.password });

        if (testEmail && testPassword) {
            return res.status(409).send({ message: "Username and password already in use" })
        }
        else {
            let myobj = {
                username: req.body.username,
                password: req.body.password
            };

            const result = db_connect.collection("accounts").insertOne(myobj);
            console.log("Created an account");
            res.json(result);
        }
    } catch (err) {
        throw err;
    }
});

