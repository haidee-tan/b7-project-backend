const express = require("express");
const router = express.Router();
const Beneficiary = require('../models/Beneficiary');

router.get("/", (req,res) => {
    Beneficiary.find({})
    .then(beneficiaries => 
        res.send(beneficiaries)
        )
})

module.exports = router;