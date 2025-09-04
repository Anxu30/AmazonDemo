const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const mongoDB = require("connect-mongodb-session")(session);

const user=require('./Routes/user');
const guest=require('./Routes/guest');
const verifyOtp=require('./Routes/verify');
const getOtp=require('./Routes/getOtp');

const app = express();
app.use(express.urlencoded());
app.use(express.json());
app.set('view engine','ejs');
app.set('views','views');
const db_Path =
  "mongodb+srv://root:Qwertyz%40123@anujchaudhary.ymavmtv.mongodb.net/Amazon_Demo?retryWrites=true&w=majority&appName=AnujChaudhary";
const port = 2430;

const store = new mongoDB({
  uri: db_Path,
  collection: "sessions",
});

app.use(
  session({
    secret: "anujChaudhary",
    resave: false,
    saveUninitialized: true,
    store: store,
  })
);
app.use(getOtp);
app.use(verifyOtp);
app.use(user);
app.use(guest);

mongoose
  .connect(db_Path)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is Running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("Connection Error",err);
  });
