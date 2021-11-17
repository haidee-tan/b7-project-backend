const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Donation = require('../models/Donation');
const {canDonate, decodeToken, isAdmin} = require("../auth");

// Create donation: req body should contain quantity, fee, beneficiaryId, paymentMethod, paymentNotes
router.post("/create/post/:id/:beneficiaryId", canDonate, (req, res) => {
    let userInfo = decodeToken(req.headers.authorization);
    let donation = new Donation(req.body);
    donation.beneficiaryId = mongoose.Types.ObjectId(req.params.beneficiaryId);
    donation.postId = mongoose.Types.ObjectId(req.params.id);
    donation.userId = mongoose.Types.ObjectId(userInfo._id);
    donation.save()
    .then(donation => res.send(donation))
})

// Display donations of the user
router.get("/user", (req, res) => {
    let userInfo = decodeToken(req.headers.authorization);
    Donation.find({userId: userInfo._id})
    .then(donation => res.send(donation))
})

// Display all donations, for admin only
router.get("/all", isAdmin, (req, res) => {
    Donation.find({})
    .then(donation => res.send(donation))
})

// Delete donation, for admin only
router.delete("/delete/:id", isAdmin, (req,res) => {
    Donation.findOneAndDelete({_id: req.params.id})
    .then(data => res.send(data))
})

// Edit donation, for admin only
router.put("/edit/:id", isAdmin, (req,res) => {
    Donation.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
    .then(data => res.send(data))
})

module.exports = router;