const express = require ("express");
const mongoose = require ("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 8000;

const BeneficiaryRouter = require('./routes/beneficiaryRouter')

mongoose.connect("mongodb://localhost/fighthungerdb");

app.use(cors());
app.use(bodyParser.json());

app.use('/beneficiaries', BeneficiaryRouter)

app.listen(port, () => console.log(`Listening on port ${port}!`));