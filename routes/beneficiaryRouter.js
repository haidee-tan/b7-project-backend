const express = require("express");
const router = express.Router();
const Beneficiary = require('../models/Beneficiary');
const multer = require('multer');
const {isAdmin} = require("../auth");

// MULTER CONFIG
// SET FOR SINGLE UPLOAD
// CAN SAVE UPLOAD BUT THRU POSTMAN, ALL PROPS REFLECTED IN THE FE BUT NOW THE ACTUAL IMAGE  
const multerStorage = multer.diskStorage({
    destination: (req, file, next) => {
        next(null, './public');
    },
    filename: (req, file, next) => {
        const ext = file.mimetype.split('/')[1]
        let random = (Math.random() + 1).toString(36).substring(2)
        next(null, Date.now() + '.' + ext )
    }
})
const upload = multer({ storage: multerStorage})

router.get("/", (req, res) => {
    Beneficiary.find({})
    .then(beneficiary =>
        res.send(beneficiary)
    )
})

router.post("/", upload.single('photo'), (req,res) => {
    let beneficiary = new Beneficiary();
    beneficiary.name = req.body.name
    beneficiary.address = req.body.address
    beneficiary.contactNum = req.body.contactNum
    beneficiary.description = req.body.description
    beneficiary.website = req.body.website
    beneficiary.photo = req.file.filename
    beneficiary.save()
    .then (beneficiary => {
        res.send(beneficiary)
    })
})

router.put("/:id", upload.single('photo'), (req,res) => {
    Beneficiary.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
    .then(data => {res.send(data)
    })
})

// DELETE BENEFICIARY, ADMIN ONLY
router.delete("/delete/:id", isAdmin, (req,res) => {
    Beneficiary.findOneAndDelete({_id: req.params.id})
        .then( data => res.send(data))
})

module.exports = router;