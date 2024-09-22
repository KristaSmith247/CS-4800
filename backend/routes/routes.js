
const express = require("express");

const accountRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../database/conn");

// This helps convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
accountRoutes.route("/account").get(async (req, res) => {
    try {
        let db_connect = dbo.getDb("language-app");
        // the following line will return all information about an account 
        const result = await db_connect.collection("accounts").find({}).toArray();
        res.json(result);
    } catch (err) {
        throw err;
    }
});


// This section will help you create a new record.
accountRoutes.route("/account/create").post(async (req, res) => {
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

// file to keep records of accounts


const express = require("express");

// accountRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const accountRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This helps convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
accountRoutes.route("/record").get(async (req, res) => {
    try {
        let db_connect = dbo.getDb("checkingAccounts");
        // the following line will return all information about an account except for the password
        const result = await db_connect.collection("records").find({}).project({ password: 0 }).toArray();
        res.json(result);
    } catch (err) {
        throw err;
    }
});

// This section will help you get a single record by id
accountRoutes.route("/record/:id").get(async (req, res) => {
    try {
        let db_connect = dbo.getDb();
        let myquery = { _id: new ObjectId(req.params.id) };
        const result = await db_connect.collection("records").findOne(myquery);
        res.json(result);
    } catch (err) {
        throw err;
    }
});

// TEST: get a record associated with an email
accountRoutes.route("/record/:emailAddress").post(async (req, res) => {
    try {
        let db_connect = dbo.getDb("checkingAccounts");
        // works with hardcoded email value
        const result = await db_connect.collection("records")
            .find({ emailAddress: "marnie@email.com" })
            .project({ password: 0 }).toArray();

        // let user enter email to search for
        // let myEmailSearch = { _id: req.params.emailAddress };
        // const result = await db_connect.collection("records")
        //     .findOne(myEmailSearch)
        //     .project({ password: 0 }).toArray();
        res.json(result);
    } catch (err) {
        throw err;
    }
});

// This section will help you create a new record.
accountRoutes.route("/account/add").post(async (req, res) => {
    try {
        let db_connect = dbo.getDb();
        // verify if email already in database
        let testEmail = await db_connect.collection("records").findOne({ emailAddress: req.body.emailAddress });
        let testPassword = await db_connect.collection("records").findOne({ password: req.body.password });

        if (testEmail && testPassword) {
            return res.status(409).send({ message: "Email and password already in use" })
        }
        else {
            let myobj = {
                username: req.body.username,
                password: req.body.password,
                type: "", // role is blank for now
                
            };

            const result = db_connect.collection("accounts").insertOne(myobj);
            console.log("Created an account");
            res.json(result);
        }
    } catch (err) {
        throw err;
    }
});


// This section will help you update a record by id.
accountRoutes.route("/update/:id").put(async (req, res) => {
    try {
        let db_connect = dbo.getDb();
        let myquery = { _id: new ObjectId(req.params.id) };
        let newvalues = {
            $set: {
                username: req.body.username,
                password: req.body.password,
                type: req.body.type, // role is being updated
            },
        };
        const result = db_connect.collection("accounts").updateOne(myquery, newvalues);
        console.log("1 account updated");
        res.json(result);
    } catch (err) {
        throw err;
    }
});


// This section will help you delete a record
accountRoutes.route("/:id").delete(async (req, res) => {
    try {
        let db_connect = dbo.getDb();
        let myquery = { _id: new ObjectId(req.params.id) };
        const result = db_connect.collection("accounts").deleteOne(myquery);
        console.log("1 document deleted");
        res.json(result);
    } catch (err) {
        throw err;
    }
});