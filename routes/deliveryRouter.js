const express = require("express");
const router = express.Router();
const Delivery = require('../models/Delivery');

router.get("/", (req,res) => {
    Delivery.find({})
    .then(delivery => 
        res.send(delivery)
        )
})

router.post("/", (req,res) => {
    let delivery = new Delivery(req.body);
    delivery.save()
    .then ( delivery => {
        res.send(delivery)
    })
})

router.put("/:id", (req,res) => {
    Delivery.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
    .then(data => res.send(data))
})
router.delete("/:id", (req,res) => {
    Delivery.findOneAndDelete({_id: req.params.id})
        .then( data => res.send(data))
})

module.exports = router;