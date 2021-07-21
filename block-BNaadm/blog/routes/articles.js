var express = require('express');
var router = express.Router();
var Article = require('../models/Article')
var Comment = require('../models/Comment')

/* GET users listing. */
router.get('/new', function(req, res, next) {
  res.render("articleform")
});

router.post('/', (req,res,next) => {
  // console.log(req.body)
  Article.create(req.body, (err,article) => {
    console.log(err, article)
    if(err) return res.redirect('/articles/new')
    res.redirect('/articles')
  })
})

router.get('/', (req,res,next) => {
  Article.find({},(err,article) => {
    if(err) return next(err)
    res.render('allarticles', {articles : article})
  })
})

// update and delete 

// router.get("/:id", (req,res) => {
//   let id = req.params.id;
//   Article.findById(id,(err,article) => {
//     if(err) return res.render(err)
//     res.render("singlearticle", {articles : article})
//   })
// })

router.get("/:id", (req,res) => {
  let id = req.params.id;
  Article.findById(id,(err,article) => {
    if(err) return res.render(err)
    Comment.find({articleId : id}, (err,comment) => {
      res.render('singlearticle', {articles : article, comments : comment})
    })
  })
})

router.get("/:id/edit", (req,res,next) => {
  let id = req.params.id;
  Article.findById(id,(err,article) => {
    if(err) return next(err)
    res.render("updatearticle", {articles : article})
  })
})

router.post("/:id", (req,res,next) => {
  let id = req.params.id;
  Article.findByIdAndUpdate(id,req.body,(err,article) => {
    if(err) return next(err)
    res.redirect("/articles/" + id)
  })
})

router.get("/:id/delete", (req,res,next) => {
  let id = req.params.id;
  Article.findByIdAndRemove(id,(err,article) => {
    if(err) return next(err);
    res.redirect("/articles")
  })
})

// likes and dislikes

router.get("/:id/likes", (req,res,next) => {
  let id = req.params.id;
  Article.findByIdAndUpdate(id,{$inc : {likes : 1}}, (err,likes) => {
    if(err) return next(err);
    res.redirect("/articles/" + id)
  })
})

router.get("/:id/dislikes", (req,res,next) => {
  let id = req.params.id;
  Article.findByIdAndUpdate(id,{$inc : {likes : -1}}, (err,likes) => {
    if(err) return next(err);
    res.redirect("/articles/" + id)
  })
})

//  Add Comments
router.post("/:id/comments", (req,res,next) => {
  console.log(req.body)
  let id = req.params.id;
  req.body.articleId = id;
  Comment.create(req.body,(err,comment) => {
    console.log(err,comment)
    if(err) return next(err);
    res.redirect('/articles/' + id)
  })
  
})

module.exports = router;
