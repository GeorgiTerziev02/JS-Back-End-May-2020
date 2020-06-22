require('dotenv').config();

const express = require('express');
const cubeRouter = require('./routes/cube');
const { connectDB } =require('./config/database');

const app = express();

connectDB();

app.use(express.json())

app.use('/api/cubes', cubeRouter);

app.listen(4000, ()=>{
    console.log('Rest API is running on port 4000')
});