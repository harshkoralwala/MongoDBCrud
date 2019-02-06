//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

var obj = new ObjectID();
console.log(obj);


MongoClient.connect("mongodb://localhost:27017", (error, client) => {
    if (error) {
        return console.log("unable to connect to mongo db");
    }
    console.log("Connected to mongoDb server");
    db = client.db("Todos");

    db.collection("User").findOneAndUpdate({
        _id: new ObjectID("5c5afef904022a84937c35e4")
    }, {
            $set: {
                lastName: "KoralWala",
                name: "HARSH",
            }, $inc: {
                age: 1
            }
        },
        {
            returnOriginal: false

        }).then((result) => {
            console.log(result);
        })

    //    client.close();
})