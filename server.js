const express  = require('express'); //imorting the express module

const app = express(); //variable to express module

app.get('/', (req,res) => res.send('API Running')); //if the request is a success then the response is api running

const PORT = process.env.PORT || 5000; //if there's no env variable set, then the default port is 5000

app.listen(PORT, () => console.log("Sever started on port ${PORT}"));