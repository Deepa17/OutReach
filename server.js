const express  = require('express'); //imorting the express module
const connectDB = require('./config/db');
const app = express(); //variable to express module

//connect the database
connectDB();

//Init Middleware
app.use(express.json({extended: false}));


app.get('/', (req,res) => res.send('API Running')); //if the request is a success then the response is api running


//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000; //if there's no env variable set, then the default port is 5000

app.listen(PORT, () => console.log("Sever started on port ${PORT}"));