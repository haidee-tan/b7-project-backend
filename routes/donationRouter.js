const express = require("express");
const router = express.Router();
const Donation = require('../models/Donation');
const multer = require('multer')


// MULTER CONFIG
// SET FOR MULTIPLE UPLOADS
// CAN SAVE UPLOAD BUT THRU POSTMAN, ALL PROPS REFLECTED IN THE FE BUT NOW THE ACTUAL IMAGE  
const multerStorage = multer.diskStorage({
    destination: (req, file, next) => {
        next(null, './public');
    },
    filename: (req, file, next) => {
        const ext = file.mimetype.split('/')[1]
        next(null, Date.now() + '.' + ext )
    }
})
const upload = multer({ storage: multerStorage})



router.get("/", upload.array('img', 5), (req,res) => {
    Donation.find({})
    .then(donation => 
        res.send(donation)
        )
})

router.post("/", upload.array('img', 5), (req,res) => {
    let donation = new Donation(req.body);
    donation.save()
    .then ( donation => {
        res.send(donation)
    })
})

router.put("/:id", (req,res) => {
    Donation.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
    .then(data => res.send(data))
})
router.delete("/:id", (req,res) => {
    Donation.findOneAndDelete({_id: req.params.id})
        .then( data => res.send(data))
})

module.exports = router;