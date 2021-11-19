const express = require("express");
const router = express.Router();
const Post = require('../models/Post');
const Donation = require('../models/Donation');
const multer = require('multer')
const {canDonate, decodeToken, isAdmin, canPost} = require("../auth");
const mongoose = require("mongoose");

const multerStorage = multer.diskStorage({
        destination: (req, file, next) => {
            next(null, './public');
        },
        filename: (req, file, next) => {
            const ext = file.mimetype.split('/')[1]
            let random = (Math.random() + 1).toString(36).substring(2)
            next(null, Date.now() + random + '.' + ext )
        }
    })
const upload = multer({ storage: multerStorage})

router.get("/", (req, res) => {
    Post.find({status: "active"})
    .then(posts => res.send(posts))
})

router.post("/", canPost, upload.single('photo'), (req, res) => {
    let userInfo = decodeToken(req.headers.authorization); 
    let post = new Post();
    post.name = req.body.name
    post.description = req.body.description
    post.availability = req.body.availability
    post.price = req.body.price
    post.photo = req.file.filename
    post.quantity = req.body.quantity
    post.status = req.body.status
    post.user = mongoose.Types.ObjectId(userInfo._id);
    post.save()
    .then(post => {
        res.send(post)
    });
})

// admin: only status can be edited
router.put("/:id", isAdmin, (req,res) => {
    Post.findOne({_id: req.params.id})
    .then(post => {
        post.status = req.body.status
        post.save()
        .then(post => res.send(post))
    })
})

router.delete("/:id", isAdmin, (req,res) => {
    Donation.deleteMany({post: req.params.id})
    .then(() => {
        Post.findOneAndDelete({_id: req.params.id})
        .then(data => res.send(data))
    })
})

module.exports = router;