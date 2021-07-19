var express = require('express');
var router = express.Router();
let Article = require("../models/Article")

/* GET users listing. */
router.get('/new', function(req, res, next) {
  res.render("articleForm", {})
});

router.post('/', (req,res) => {
  // console.log(req.body)
    Article.create(req.body, (err,article) => {
      console.log(req.body)
      if(err) return res.redirect("/articles/new")
      res.redirect("/articles")
    })
})

router.get("/", (req,res) => {
  Article.find({}, (err,article) => {
    if(err) return res.send(err)
    res.render("articles", {articles : article})
  })
})

// update and delete

router.get("/:id", (req,res) => {
  let id = req.params.id;
  Article.findById(id, (err,article) => {
    if(err) return res.send(err)
    res.render("eacharticle", {articles : article})
  })
})

router.get("/:id/edit", (req,res) => {
  let id = req.params.id;
  Article.findById(id,req.body,(err,article) => {
    if(err) return res.send(err)
    res.render("updatearticle", {articles : article})
  })
})

router.post("/:id", (req,res)=> {
  let id = req.params.id;
  Article.findByIdAndUpdate(id,req.body,(err,article) => {
    if(err) return res.send(err)
    res.redirect("/articles/" + id)
  })
})

router.get("/:id/delete", (req,res)=> {
  Article.findByIdAndDelete(id,(err,article) => {
    if(err) return res.send(err);
    res.redirect("/articles")
  })
})


// increament and decreament
router.get("/:id/likes", (req,res) => {
  let id = req.params.id;
  Article.findByIdAndUpdate(id,{$inc : {likes : 1}},{$dec :{likes : -1}}, (err,article) => {
    if(err) return next(err)
    res.redirect("/articles/" + id)
  })
})

router.get("/:id/dislikes", (req,res) => {
  let id = req.params.id;
  Article.findByIdAndUpdate(id,{$inc :{likes : -1}}, (err,article) => {
    if(err) return next(err)
    res.redirect("/articles/" + id)
  })
})
module.exports = router;
