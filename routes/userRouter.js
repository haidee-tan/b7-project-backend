const express = require("express");
const router = express.Router();
const User = require('../models/User');
const bcrypt = require("bcrypt");
const {createAccessToken, isAdmin} = require("../auth");

// Sign up new user
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
    .catch(err => res.send(err))
});

// Login user: needed email address and password only
router.post("/login", (req, res) => {
    console.log(req);
    User.findOne({email: req.body.email})
    .then(user => {
        let match = bcrypt.compareSync(req.body.password, user.password);
        match ?
        res.send({
            access: createAccessToken(user),
            role: user.role,
            email: user.email,
            status: user.status
        })
        :
        res.send("invalid credentials");
    })
})

// Update user status: only admin role is authorized
router.put("/:id", isAdmin, (req,res) => {
    User.findOne({_id: req.params.id})
    .then(user => {
        user.status = req.body.status
        user.save()
        .then(() => res.send("success"))
    })
    .catch(() => res.send("cannot update"))
})

// Display all users
router.get("/", isAdmin, (req, res) => {
    User.find({})
    .then(user => res.send(user))
})

// Delete user
router.delete("/:id", isAdmin, (req,res) => {
    User.findOneAndDelete({_id: req.params.id})
    .then(user => res.send(user))
})

// sample token for admin user:
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkzNzQxZjVhOTkxNTg3MzJjMjA4NGIiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6InVzZXIxQHRlc3QuY29tIiwiaWF0IjoxNjM3MTI5MjIwfQ.WjuMgZJVNAa4CcbqtrzMND3y65dEiE1H1xv-qVIRLRM

module.exports = router;