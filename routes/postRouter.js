const express = require("express");
const router = express.Router();
const Post = require('../models/Post');

router.get("/", (req,res) => {
    Post.find({})
    .then(post => 
        res.send(post)
        )
})

router.post("/", (req,res) => {
    let post = new Post(req.body);
    post.save()
    .then ( post => {
        res.send(post)
    })
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