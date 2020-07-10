const express = require("express");
const app = express();
const routes = require("./routes")


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mongoose = require("mongoose");
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose.set('useCreateIndex', true);
var db = process.env.MONGODB_URI || "mongodb://localhost/ringerHeadlines";

mongoose.connect(db, function(error) {
    if (error) {
    console.log("There was an error: + " + error);
    }
    else {
    console.log("Mongoose connection created successfully.");
    }
});

app.use(routes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, function() {
    console.log(`App listening on PORT https://localhost${PORT}`);
});