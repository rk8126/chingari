const express=require('express');
const handlebar=require('express-handlebars');
const path=require('path');
const cors=require('cors');
const hbsHelpers = require('./hbsHelper.js.js');
const cookieParser = require('cookie-parser');

const app=express();

const hbs = handlebar.create({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/pieces'),
    helpers: hbsHelpers
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.enable('view cache');

app.use(cors());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.json());


app.listen(3000);
console.log("Server running on 3000")

module.exports ={
    app,
}