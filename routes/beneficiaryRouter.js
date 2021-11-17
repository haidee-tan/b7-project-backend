const express = require("express");
const router = express.Router();
const Beneficiary = require('../models/Beneficiary');
const { isAdmin } = require("../auth")


// 
router.get("/user", isAdmin,(req,res) => {
    Beneficiary.find({})
    .then(beneficiary => 
        res.send(beneficiary)
        )
})

// 
router.post("/", (req,res) => {
    let beneficiary = new Beneficiary(req.body);
    beneficiary.save()
    .then ( beneficiary => {
        res.send(beneficiary)
    })
})

// EDIT BENEFICIARY, ADMIN ONLY
router.put("/edit/:id", isAdmin, (req,res) => {
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