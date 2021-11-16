const express = require("express");
const router = express.Router();
const Transaction = require('../models/Transaction');

router.get("/", (req,res) => {
    Transaction.find({})
    .then(transaction => 
        res.send(transaction)
        )
})

router.post("/", (req,res) => {
    let transaction = new Transaction(req.body);
    transaction.save()
    .then ( transaction => {
        res.send(transaction)
    })
})

router.put("/:id", (req,res) => {
    Transaction.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
    .then(data => res.send(data))
})
router.delete("/:id", (req,res) => {
    Transaction.findOneAndDelete({_id: req.params.id})
        .then( data => res.send(data))
})

module.exports = router;