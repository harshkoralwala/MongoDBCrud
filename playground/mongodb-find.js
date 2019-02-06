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

    // db.collection("Todos").find({
    //     _id: new ObjectID("5c59b55c292e372154e81a42")
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));

    // }, (err) => {
    //     console.log('unable to fetch todos', err);
    // }
    // );


    // db.collection("Todos").find().count().then((count) => {
    //     console.log(`Todos count: ${ count }`);

    // }, (err) => {
    //     console.log('unable to fetch todos', err);
    // }
    // );


    db.collection("User").find({name:"Harsh"}).count().then((count) => {
        console.log(`Todos count: ${ count }`);

    }, (err) => {
        console.log('unable to fetch todos', err);
    }
    );


    //    client.close();
})