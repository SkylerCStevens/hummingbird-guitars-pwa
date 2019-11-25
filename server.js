const express = require("express");
const path = require("path"); //Import path from node
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv").config();

const app = express(); //Save the object returned from express()
const port = process.env.PORT || 4000; //Set the port variable to be equal to system defined port or 3001
const uri = process.env.ATLAS_URI

const contactRoutes = require("./routes/contactRoutes"); //Import the routes for contact endpoints
const productRoutes = require("./routes/productRoutes"); //Import the routes for product endpoints
const userRoutes = require("./routes/userRoutes"); //Import the routes for user endpoints

//Use helmet's default security settings
app.use(helmet());

//Used for put and post requests where server must accept the data
app.use(express.json()); //recognizes that an incoming request object is a JSON object
app.use(express.urlencoded({ extended: true })); //Recognizes that an incoming request object is a string or an array

//Logs information about server requests. The 'dev' format color codes the status codes as well for clear reading during development
app.use(morgan("dev"));

//Check if the project is in production or development. If it is production then it will run the static build file.
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// connection to database
mongoose.connect(uri, { useNewUrlParser: true, 
  useCreateIndex: true, 
  useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
console.log("MongoDB connection is live");
})

// Use API Routes
app.use("/api/contacts", contactRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

//On the root route send the user to the index.html page
//http://localhost:3000/
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//If another url path is entered return a 404 status
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//Have the server listen for requests on the specified port above and print that it is listening on port#
app.listen(port, console.log(`Server listening on port: ${port}`));
