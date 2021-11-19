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
    Beneficiary.find({status: "active"})
    .then(beneficiary =>
        res.send(beneficiary)
    )
})

// Add, edit, delete beneficiary for Admin only
router.post("/", isAdmin, upload.single('photo'), (req,res) => {
    let beneficiary = new Beneficiary();
    beneficiary.name = req.body.name
    beneficiary.address = req.body.address
    beneficiary.contactNum = req.body.contactNum
    beneficiary.description = req.body.description
    beneficiary.website = req.body.website
    beneficiary.photo = req.file.filename
    beneficiary.status = "active"
    beneficiary.save()
    .then (beneficiary => {
        res.send(beneficiary)
    })
})
router.put("/:id", isAdmin, upload.single('photo'), (req,res) => {
    Beneficiary.findOne({_id: req.params.id})
    .then(beneficiary => {
        beneficiary.name = req.body.name
        beneficiary.address = req.body.address
        beneficiary.contactNum = req.body.contactNum
        beneficiary.description = req.body.description
        beneficiary.website = req.body.website
        beneficiary.photo = req.file.filename
        beneficiary.status = req.body.status
        beneficiary.save()
        .then (beneficiary => {
            res.send(beneficiary)
        })
    })
})
router.delete("/delete/:id", isAdmin, (req,res) => {
    Beneficiary.findOne({_id: req.params.id})
    .then(beneficiary => {
        beneficiary.status = "inactive"
        beneficiary.save()
        .then(beneficiary => res.send(beneficiary))
    })
})

module.exports = router;