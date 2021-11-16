const express = require("express");
const router = express.Router();
const User = require('../models/User');

router.get("/", (req,res) => {
    User.find({})
    .then(user => 
        res.send(user)
        )
})

router.post("/", (req,res) => {
    let user = new User(req.body);
    user.save()
    .then ( user => {
        res.send(user)
    })
})

router.put("/:id", (req,res) => {
    User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
    .then(data => res.send(data))
})
router.delete("/:id", (req,res) => {
    User.findOneAndDelete({_id: req.params.id})
        .then( data => res.send(data))
})

module.exports = router;