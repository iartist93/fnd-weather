const express = require("express");
const { format } = require("date-fns");

const app = express();

/* Dependencies */

const bodyParser = require("body-parser");
const cors = require("cors");
const { runInNewContext } = require("vm");

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

let weatherData = {};

app.get("/getData", (req, res) => {
  console.log(`get data ${weatherData}`);
  res.send(weatherData);
});

app.post("/addNew", (req, res) => {
  console.log(`Add new ${req.body}`);
  weatherData = req.body;
  weatherData["day"] = format(Date.now(), "EEEE, d MMMM");
  res.send(weatherData);
});
