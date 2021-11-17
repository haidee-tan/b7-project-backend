const express = require ("express");
const mongoose = require ("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require('multer')
const multerPostConfig = require('./config/multerPostConfig')



const app = express();
const port = 8000;

const BeneficiaryRouter = require('./routes/beneficiaryRouter')
const DeliveryRouter = require('./routes/deliveryRouter')
const DonationRouter = require('./routes/donationRouter')
const PostRouter = require('./routes/postRouter')
const TransactionRouter = require('./routes/transactionRouter')
const UserRouter = require('./routes/userRouter')

const Photo = require('./models/Photo')

mongoose.connect("mongodb://localhost/fighthungerdb");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));


app.use('/beneficiaries', BeneficiaryRouter)
app.use('/deliveries', DeliveryRouter)
app.use('/donations', DonationRouter)
app.use('/posts', PostRouter)
app.use('/transactions', TransactionRouter)
app.use('/users', UserRouter)

// FOR SAMPLE UPLOAD
app.post('/upload', multer(multerPostConfig).single('img'), (req, res) => {
    let photo = new Photo();
    photo.image = req.file.filename
    photo.save()
    .then(photo => res.send(photo));
})

app.listen(port, () => console.log(`Listening on port ${port}!`));