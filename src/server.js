const express = require("express");
const app = express();

/* Dependencies */

const bodyParser = require("body-parser");
const cors = require("cors");

/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use Cors for cross origin allowance
app.use(cors());

console.log(cors);
console.log(cors());

// inialize the main project folde???
// connect clinet-side code inside `demo` foler
app.use(express.static("./src/website"));

/* Routing */

const listening = () => {
  console.log(`listening on ${port}`);
};

const port = 8000;
const server = app.listen(port, listening);

const movies = [];

app.get("/hello", (req, res) => {
  res.send("hello");
});

app.get("/allMovies", (req, res) => {
  res.send(movies);
});

app.post("/addMovie", (req, res) => {
  movies.push(req.body);
  res.send(movies);
});
