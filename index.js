const express = require ("express");
const mongoose = require ("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");


const app = express();
const port = 8000;

const BeneficiaryRouter = require('./routes/beneficiaryRouter')
const DonationRouter = require('./routes/donationRouter')
const PostRouter = require('./routes/postRouter')
const UserRouter = require('./routes/userRouter')

mongoose.connect("mongodb://localhost/fighthungerdb");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));


app.use('/beneficiaries', BeneficiaryRouter)
app.use('/donations', DonationRouter)
app.use('/posts', PostRouter)
app.use('/users', UserRouter)

app.listen(port, () => console.log(`Listening on port ${port}!`));