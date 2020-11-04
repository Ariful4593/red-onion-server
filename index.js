const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xsirj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express();


app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello World");
})


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
app.listen(process.env.PORT || port)