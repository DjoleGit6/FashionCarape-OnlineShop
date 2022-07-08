const mongo4j = require("mongo4j");
const app = require("./app");
const connectMongoDatabase = require("./db/MongoDatabase.js");
const connectNeo4jDatabase = require("./db/Neo4jDatabase.js");
const cloudinary = require("cloudinary").v2;

//Handling uncaught Exception
process.on("uncaughtException",(err) =>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server for Handling uncaught Exception`);
})

// config
if(process.env.NODE_ENV!=="PRODUCTION"){
require("dotenv").config({
    path:"backend/config/.env"
})}
// connect Mongo database
connectMongoDatabase();
// connect Neo4j database
connectNeo4jDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// create server
const server = app.listen(process.env.PORT,() =>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})


// Unhandled promise rejection
process.on("unhandledRejection", (err) =>{
    console.log(`Shutting down server for ${err.message}`);
    console.log(`Shutting down the server due to Unhandled promise rejection`);
    server.close(() =>{
        process.exit(1);
    });
});