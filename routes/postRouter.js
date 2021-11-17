const express = require("express");
const router = express.Router();
const Post = require('../models/Post');
const multer = require('multer')

// MULTER CONFIG
// SET FOR MULTIPLE UPLOADS
// CAN SAVE UPLOAD BUT THRU POSTMAN, ALL PROPS REFLECTED IN THE FE BUT NOW THE ACTUAL IMAGE  
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



router.get("/", upload.array('img', 5), (req,res) => {
    Post.find({})
    .then(post => 
        res.send(post)
        )
})

router.post("/", upload.array('img', 5), (req,res) => {
    console.log(req.file) 
    let post = new Post(req.body);
    // post.name = req.body.name
    // post.description = req.body.description
    // post.availability = req.body.availability
    // post.price = req.body.price
    // post.photos = req.body.photo
    // post.quantity = req.body.quantity
    // post.status = req.body.status
        post.save()
        .then ( post => {
            res.send(post)
    });
})


router.put("/:id", (req,res) => {
    Post.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
    .then(data => res.send(data))
})

router.delete("/:id", (req,res) => {
    Post.findOneAndDelete({_id: req.params.id})
        .then( data => res.send(data))
})

module.exports = router;