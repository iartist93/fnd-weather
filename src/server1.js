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

// inialize the main project folde???
// connect clinet-side code inside `demo` foler
app.use(express.static("demo"));

/* Setup Server */

const listening = () => {
  console.log(`listening on ${port}`);
};

const port = 8000;

const server = app.listen(port, listening);
