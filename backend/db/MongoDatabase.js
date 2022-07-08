const mongoose = require("mongoose");
require("dotenv").config({
    path:"backend/config/.env"
})


const connectMongoDatabase = () =>{
    mongoose.connect(process.env.DB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((data) =>{
        console.log(`mongodb is connected with server: ${data.connection.host}`);
    })
}

module.exports = connectMongoDatabase