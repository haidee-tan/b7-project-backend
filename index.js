const express = require ("express");
const mongoose = require ("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 8000;

mongoose.connect("mongodb://localhost/fighthungerdb");

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello world!"));

app.listen(port, () => console.log(`Listening on port ${port}!`));