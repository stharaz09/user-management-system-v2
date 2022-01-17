const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))




const route = require(__dirname + '/server/routes/user')
app.use('/', route)


app.listen(process.env.port, function(){
    console.log("Server connected successfully!!");
})


