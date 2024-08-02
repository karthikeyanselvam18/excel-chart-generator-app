var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require('cors')
const mongoose = require("mongoose");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var uploadRouter = require("./routes/upload");
var getDataRouter = require("./routes/getData");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors())

const mongoURI =
  "mongodb+srv://karthikeyanselvam18:brucewayne18@furn-ecommerce-mongodb.7fodm6f.mongodb.net/?retryWrites=true&w=majority&appName=furn-ecommerce-mongodb";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/upload", uploadRouter);
app.use('/getData', getDataRouter)

module.exports = app;
