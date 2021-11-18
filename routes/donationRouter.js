const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Donation = require('../models/Donation');
const Post = require('../models/Post');
const {canDonate, decodeToken, isAdmin} = require("../auth");

// Display donations of the user
router.get("/user", (req, res) => {
    let userInfo = decodeToken(req.headers.authorization);
    Donation.find({userId: userInfo._id}).populate("beneficiary").populate("post")/*.populate("user")*/
    .then(donation => res.send(donation))
})

// Display all donations, for admin only
router.get("/all", /*isAdmin,*/ (req, res) => {
    Donation.find({}).populate("beneficiary").populate("post")/*.populate("user")*/
    .then(donation => res.send(donation))
})

// MULTER CONFIG
// SET FOR MULTIPLE UPLOADS
// CAN SAVE UPLOAD BUT THRU POSTMAN, ALL PROPS REFLECTED IN THE FE BUT NOW THE ACTUAL IMAGE  
const multer = require('multer');
const multerStorage = multer.diskStorage({
    destination: (req, file, next) => {
        next(null, './public');
    },
    filename: (req, file, next) => {
        const ext = file.mimetype.split('/')[1]
        next(null, Date.now() + '.' + ext )
    }
})
const upload = multer({ storage: multerStorage})

// Create donation: req body should contain quantity, paymentMethod, paymentNotes
// once login is setup, bring back commented out items
router.post("/create/post/:id/:beneficiaryId", /*canDonate,*/ (req, res) => {
    // let userInfo = decodeToken(req.headers.authorization);
    let donation = new Donation(req.body);
    Post.findOne({_id: req.params.id})
    .then(post => {
        if (donation.quantity < post.quantity) {
            post.quantity = post.quantity - donation.quantity
        }
        else {
            donation.quantity = post.quantity;
            post.quantity = 0;
        }
        donation.fee = donation.quantity * post.price;
        donation.beneficiary = mongoose.Types.ObjectId(req.params.beneficiaryId);
        donation.post = mongoose.Types.ObjectId(req.params.id);
        // donation.user = mongoose.Types.ObjectId(userInfo._id);
        donation.save()
        .then(donation => {
            post.donations.push(donation._id);
            post.save()
            .then(post => res.send(post))
        })
    })
})

// Delete donation, for admin only
router.delete("/delete/:id", isAdmin, (req,res) => {
    Donation.findOne({_id: req.params.id})
    .then(donation => {
        Post.findOne({_id: donation.postId})
        .then(post => {
            post.quantity = post.quantity + donation.quantity;
            post.donations.splice(post.donations.indexOf(donation._id) , 1);
            post.save()
            .then(post => {
                donation.delete();
                res.send("deleted");
            });
        });
    });
})

// Edit donation, for admin only
router.put("/edit/:id", isAdmin, (req,res) => {
    let newDonation = req.body;
    Donation.findOne({_id: req.params.id})
    .then(donation => {
        Post.findOne({_id: donation.postId})
        .then(post => {
            let quantityChecker = post.quantity + donation.quantity - newDonation.quantity;
            if (quantityChecker >= 0) {
                donation.quantity = newDonation.quantity;
                post.quantity = quantityChecker;
            }
            else {
                donation.quantity = post.quantity;
                post.quantity = 0;
            }
            post.save();
            donation.fee = donation.quantity * post.price;
            donation.paymentMethod = newDonation.paymentMethod;
            donation.paymentNotes = newDonation.paymentNotes;
            donation.beneficiaryId = mongoose.Types.ObjectId(newDonation.beneficiaryId);
            donation.postId = mongoose.Types.ObjectId(newDonation.postId);
            donation.save()
            .then(donation => res.send(donation))
        })
    })
})

module.exports = router;