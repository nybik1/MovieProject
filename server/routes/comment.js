const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");
const { auth } = require("../middleware/auth");

//=================================
//             Subscribe
//=================================

router.post("/saveComment", auth, (req, res) => {

    const comment = new Comment(req.body)

    comment.save((err, comment) => {
        console.log(err)
        if (err) return res.json({ success: false, err })

        Comment.find({ '_id': comment._id })
            .populate('userFrom')
            .exec((err, result) => {
                if (err) return res.json({ success: false, err })
                return res.status(200).json({ success: true, result })
            })
    })
})

router.post("/getComments", (req, res) => {

    // let variable = {};
    // if (req.body.movieId) {
    //     variable = { postId: req.body.movieId }
    // }
    // else {
    //     variable = { writer: req.body.writer }
    // }

    Comment.find({ 'postId': req.body.movieId })
        .populate('userFrom')
        .exec((err, comments) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, comments })
        })
});

router.post('/getUserComments', (req, res) => {
    Comment.find({ "userFrom": req.body.userFrom })
        .exec((err, comments) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, comments })
        })
})

module.exports = router;
