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
accountRoutes.route("/account").get(async (req, res) => {
    try {
        let db_connect = dbo.getDb("languageApp");
        // the following line will return all information about an account except for the password
        const result = await db_connect.collection("accounts").find({}).project({ password: 0 }).toArray();
        res.json(result);
    } catch (err) {
        throw err;
    }
});

// This section will help you get a single record by id
accountRoutes.route("/account/:id").get(async (req, res) => {
    try {
        let db_connect = dbo.getDb();
        let myquery = { _id: new ObjectId(req.params.id) };
        const result = await db_connect.collection("accounts").findOne(myquery);
        res.json(result);
    } catch (err) {
        throw err;
    }
});

// This section will help you create a new record.
accountRoutes.route("/create").post(async (req, res) => {
    try {
        let db_connect = dbo.getDb();
        // verify if email already in database
        // let testUser = await db_connect.collection("accounts").findOne({ username: req.body.username });
        // let testPassword = await db_connect.collection("accounts").findOne({ password: req.body.password });

        // if (testUser && testPassword) {
        //     return res.status(409).send({ message: "Usernam and password already in use" })
        // }
        // else {
       
            let myobj = {
                username: req.body.username,
                password: req.body.password,
                type: "", // role is blank for now
            }
           // };
            
            const result = db_connect.collection("accounts").insertOne(myobj);
            console.log("Created an account");
            res.json(result);
        }
     catch (err) {
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

module.exports = accountRoutes;