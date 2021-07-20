let express = require('express');
let router = express.Router();
let Comment = require('../models/Comment')

router.get('/:id/edit', (req,res) => {
    let id = req.params.id;
    Comment.findById(id,(err,comment) => {
        if(err) return next(err)
        res.render('updatecomment', {comments : comment})
    })
})

router.post('/:id', (req,res,next) => {
    let id = req.params.id;
    Comment.findByIdAndUpdate(id,req.body,(err,updatecomment) => {
        if(err) return next(err)
        res.redirect("/articles/" + updatecomment.articleId)
    })
})

router.get('/:id/delete', (req,res,next) =>{
    let id = req.params.id;
    Comment.findByIdAndDelete(id,(err,deletecomment) =>{
        if(err) return next(err)
        res.redirect("/articles/" + deletecomment.articleId)
    })
})


module.exports = router;