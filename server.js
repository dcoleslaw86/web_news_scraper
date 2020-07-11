var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");

var express = require("express");
var app = express();

app.use(logger("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(express.static(process.cwd() + "/public"));
var exphbs = require("express-handlebars");
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

//mongoose.connect("localhost/heroku_d530fq8f");
//mongoose.connect("localhost/heroku_w4v767cb");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://heroku_d530fq8f:refrdfga1mimi08sgqj2jbvh6l@ds027335.mlab.com:27335/heroku_d530fq8f";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected to Mongoose!");
});

var routes = require("./controller/controller.js");
app.use("/", routes);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on PORT " + port);
});