const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

//mongoose.connect(db) //to connect to the db; returns a promise
//we use syncawait, makes the code look like it's synchronous even though it's asynchronous

const connectDB = async () => {
    try{
        await mongoose.connect(db,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex:true
        });

        console.log('MongoDB connected');
    }   catch(err){
        console.error(err.message);
        //exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;