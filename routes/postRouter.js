const express = require("express");
const router = express.Router();
const Post = require('../models/Post');
const multer = require('multer')

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


router.get("/", (req,res) => {
    Post.find({})
    .then(post => 
        res.send(post)
        )
})

router.post("/", upload.single('photo'), (req,res) => {
    console.log(req.file)
    console.log(req.body) 
    let post = new Post();
    post.name = req.body.name
    post.description = req.body.description
    post.availability = req.body.availability
    post.price = req.body.price
    post.photo = req.file.filename
    post.quantity = req.body.quantity
    post.status = req.body.status
        post.save()
        .then ( post => {
            res.send(post)
    });
})


router.put("/:id", upload.single('photo'), (req,res) => {
    Post.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
    .then(data => res.send(data))
})

router.delete("/:id", (req,res) => {
    Post.findOneAndDelete({_id: req.params.id})
        .then( data => res.send(data))
})

module.exports = router;