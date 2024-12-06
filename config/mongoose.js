const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/codeial");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error to connect db"));

db.once("open",()=>{
    console.log("Connected db...");
});

