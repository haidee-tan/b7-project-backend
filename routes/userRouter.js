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
    .then(user => {
        res.send({
            access: createAccessToken(user),
            firstName: user.firstName,
            role: user.role,
            email: user.email,
            status: user.status
        })
    })
    .catch(err => res.send(err))
});

// Login user: needed email address and password only
router.post("/login", (req, res) => {
    User.findOne({email: req.body.email})
    .then(user => {
        let match = bcrypt.compareSync(req.body.password, user.password);
        match ?
        res.send({
            access: createAccessToken(user),
            firstName: user.firstName,
            role: user.role,
            email: user.email,
            status: user.status
        })
        :
        res.send("invalid credentials");
    })
    .catch(() => res.send("invalid credentials"))
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

module.exports = router;

// sample token for admin user: user1@test.com
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkzNzQxZjVhOTkxNTg3MzJjMjA4NGIiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6InVzZXIxQHRlc3QuY29tIiwiaWF0IjoxNjM3MTI5MjIwfQ.WjuMgZJVNAa4CcbqtrzMND3y65dEiE1H1xv-qVIRLRM

// sample token for sponsor user: user2@test.com
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTk0OWU1Y2NmMmVlZjdjMzJmMjU2MjUiLCJyb2xlIjoic3BvbnNvciIsImVtYWlsIjoidXNlcjJAdGVzdC5jb20iLCJpYXQiOjE2MzcxMzQ0MTB9.ZgL8V6GoA3xZOa1qTEJAS_-YspxgK3cZjil5EbrPoqU

// sample token for partner user: user3@test.com
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTk0OTc1MDYxOTliYzRlMzc4MDllNWMiLCJyb2xlIjoicGFydG5lciIsImVtYWlsIjoidXNlcjNAdGVzdC5jb20iLCJpYXQiOjE2MzcxMzUyNzV9.KmPNZZnRaDtVNUFViIH77yV4HknJjqnnrLAhGXfwgEU