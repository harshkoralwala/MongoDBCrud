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


    // db.collection("User").deleteMany({ name: "Harsh 2" }).then((result) => {
    //     console.log(result);
    // })
    // db.collection('User').deleteOne({ name: "Harsh new" }).then((result) => {
    //     console.log(result);
    // });

    db.collection('User').findOneAndDelete({ _id: new ObjectID("5c5afef704022a84937c35e2") }).then((result) => {
        console.log(result);
    })
    //    client.close();
})