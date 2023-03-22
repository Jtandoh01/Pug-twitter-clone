const mongoose = require('mongoose');

class Database {

    constructor(){
    this.connect();
}

connect() {
    mongoose.connect("mongodb+srv://admin:john56amo@mongo.ykb6d1k.mongodb.net/Mongo?retryWrites=true&w=majority")
    .then(() => {
        console.log("connected to mongodb database server");
    })
    .catch((err) => {
        console.log("mongodb database connection error: "+ err);
    });
} 
}
module.exports = new Database();