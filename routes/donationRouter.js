const express = require("express");
const router = express.Router();
const Donation = require('../models/Donation');

router.get("/", (req,res) => {
    Donation.find({})
    .then(donation => 
        res.send(donation)
        )
})

router.post("/", (req,res) => {
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