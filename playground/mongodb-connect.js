//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

var obj=new ObjectID();
console.log(obj);



MongoClient.connect("mongodb://localhost:27017", (error, client) => {
    if (error) {
        return console.log("unable to connect to mongo db");
    }
    console.log("Connected to mongoDb server");
    // const db = client.db("Todos");
    // db.collection("Todos").insertOne({
    //     firstName: "Harsh",
    //     lastName: "Koralwala"
    // }, (err, result) => {

    //     if (err) {
    //         return console.log("unable to insert todo")
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });


    const db = client.db("Todos");
    db.collection("User").insertOne({
        name: "Harsh",
        age: 25,
        location: "bharuch",
    }, (err, result) => {

        if (err) {
            return console.log("unable to insert User")
        }
        //     console.log(JSON.stringify(result.ops, undefined, 2));
        console.log(result.ops[0]._id.getTimestamp());

    });


    client.close();
})