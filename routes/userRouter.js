const express = require("express");
const router = express.Router();
const User = require('../models/User');
const bcrypt = require("bcrypt");
const auth = require("../auth");

router.get("/", (req,res) => {
    User.find({})
    .then(user => 
        res.send(user)
        )
})

router.post("/signup", (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, 10);
    let user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.role = req.body.role;
    user.password = hash;
    user.status = req.body.status;
    user.save()
    .then(user => res.send({
        access: auth.createAccessToken(user),
        role: user.role,
        status: user.status
    }))
    .catch(() => res.send("email taken"))
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