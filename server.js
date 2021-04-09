const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const UserRouter = require('./routes/user');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors()); //middleware
app.use(express.json()); //default json

const uri = process.env.ATLAS_URI; // connecting with string connection from our mongoDB atlas
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection established.');
});

app.use('/user', UserRouter);

app.listen(port, () => {
    console.log('server is running at port: ' + port);
});