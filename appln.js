const express = require('express');
const appln = express();

const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const user = require('./user/user_verify');
const database = require('./database/db');

const mogoose = require('mongoose');
appln.use(express.json());
appln.use('/user',user);
port = process.env.port;

appln.listen(port, ()=>{
    console.log(`servet created at ${port}`);
})