const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ObjectID } = require('mongodb');
const { query } = require('express');

const port = process.env.PORT || 5000;
const ObjectId = require('mongodb').ObjectId;





//middlewawire
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.af0nh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



async function run() {
    try {
        await client.connect();
        const database = client.db('PersonalAssistant');
        const todoCollection = database.collection('todo');
        const notesCollection = database.collection('notes');
        const passwordCollection = database.collection('password');
        const userCollection = database.collection('user');
        app.get('/todo', async (req, res) => {
            const cursor = todoCollection.find();
            const todo = await cursor.toArray();
            res.json(todo);
        })


        app.post('/todo', async (req, res) => {
            console.log(req.body)
            const todo = req.body;
            const result = await todoCollection.insertOne(todo);
            console.log(result);
            res.json(result);
        });

        app.delete('/todo/:id', async(req, res) => {
            const id = req.params.id;
            console.log("delete",id);
            const query = {_id : ObjectId(id)};
            const result = await todoCollection.deleteOne(query);
            res.json(result);
        })

        // notes 
        app.get('/notes', async (req, res) => {
            const cursor = notesCollection.find();
            const todo = await cursor.toArray();
            res.json(todo);
        })


        app.post('/notes', async (req, res) => {
            console.log(req.body)
            const todo = req.body;
            const result = await notesCollection.insertOne(todo);
            console.log(result);
            res.json(result);
        });

        app.delete('/notes/:id', async(req, res) => {
            const id = req.params.id;
            console.log("delete",id);
            const query = {_id : ObjectId(id)};
            const result = await notesCollection.deleteOne(query);
            res.json(result);
        });

        // add new user 
        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log(user);
            const result = await userCollection.insertOne(user);
            console.log(result);
            res.json(result);
        })

    } finally {
        //await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Personal Assistant')
})

app.listen(port, () => {
    console.log(`listening at ${port}`)
})