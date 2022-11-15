const express = require('express');
const cors = require("cors")
const path = require('path');
const cookieParser = require('cookie-parser');

const routes = require('./routes/index');

const app = express();

app.use(cors({
    credentials: true, origin: ['http://localhost:3000', 'http://localhost:2000'],
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}))
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

module.exports = app;