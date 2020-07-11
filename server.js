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
app.engine("handlebars",exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

var PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
    console.log("Listening on port " + PORT);
});

//mongoose.connect("mongodb://localhost/web_news_scraper");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://user:password1@ds027335.mlab.com:27335/heroku_d530fq8f";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected to Mongoose!");
});

var routes = require("./controller/controller.js");
app.use("/", routes);