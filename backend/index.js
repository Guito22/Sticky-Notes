const express = require('express');
const app = express();
const port = 3000;

const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const connectDB = require("./db");

const userRoute = require("./Routes/user")
const boardRoute = require("./Routes/board")


// First, parse incoming JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Then, use cookieParser to parse request cookies
app.use(cookieParser());

// Session middleware setup with cookie settings
app.use(session({
  secret: "thisisnotagoodsecret",
  resave: false,
  saveUninitialized: false,
  cookie: { _expires: 60000 * 60 * 24 }
}));

// CORS middleware setup
app.use(cors({ origin: true, credentials: true }));

app.use("/",userRoute)
app.use("/",boardRoute)

app.listen(port,()=>{
    console.log(`LISTENING TO PORT ${port}`);
})