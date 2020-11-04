const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config()

app.get('/', (req, res) => {
    res.send("Hello World");
})

app.use(bodyParser.json())
app.use(cors())

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xsirj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("redOnion").collection("order");
    app.post('/addOrder', (req, res) =>{
        const data = req.body;
        collection.insertOne({data})
        .then(result => {
            res.send(result.insertedCount > 0)
        })
    })
    console.log('Database Connected')
});


const port = 4000;
app.listen(port)