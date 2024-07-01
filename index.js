const express = require("express");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { default: mongoose, connection } = require("mongoose");
const { log } = require("console");

const PORT = 4000;

const app = express();

app.use(express.json());
app.use(cors());

// Database connection w mongo

mongoose.connect("mongodb+srv://gagang1912:xEhRWD4kdPwYufSR@cluster0.dpc10v0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(({connections}) => {
    console.log(connections[0].port);
})
.catch((err) => {
    console.log(err);
});

// API creation 

app.get('/', (req,res) => {
    res.send("Welcome to backend");
})

// Multer image storage engine

const storage = multer.diskStorage({
    destination: 'backend/uplaod/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.filename}_${Date.now()}${path.extname(file.originalname)}`);
    }
})

const upload = multer({storage: storage});

//Creating upload endpoint for images

app.post('/upload', upload.single('product'), (req, res) => {
    //Nothing here
})

// Starting the server

app.listen(PORT, (err) => {
    if(!err){
        console.log(`server running on port port : ${PORT}`);
    }
    else {
        console.log(err);
    }
})