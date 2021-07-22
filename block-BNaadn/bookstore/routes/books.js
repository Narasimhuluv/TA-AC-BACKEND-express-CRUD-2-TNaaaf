var express = require('express');
var router = express.Router();
var Book = require('../models/Book')
var Author = require('../models/Author')

/* GET users listing. */
router.get('/new', function(req, res, next) {
  res.render('bookform')
});

router.post('/', (req,res,next) => {
  Book.create(req.body, (err,book) =>{
    console.log(req.body)
    if(err) return next(err);
    res.redirect('/books')
  })
})
// find all the books

router.get('/', (req,res,next) => {
  Book.find({}, (err, book) => {
    if(err) return next(err);
    res.render('allbooks', {books : book})
  })
})

// find each book with id

router.get('/:id', (req,res,next) => {
  let id = req.params.id;
  Book.findById(id,(err,book) => {
    if(err) return next(err)
    res.render('singlebook', {books : book})
  })
})

// router.get('/:id', (req,res,next) => {
//   let id = req.params.id;
//   Book.findById(id).populate('author').exec((err,author) => {
//     res.render('books',{books : book})
//   })
// })

// update book

router.get('/:id/edit', (req,res,next) => {
  let id = req.params.id;
  Book.findById(id,(err,book) => {
    if(err) return next(err)
    res.render('updatebook', {books : book})
  })
})

router.post('/:id', (req,res,next) =>{
  let id = req.params.id;
  Book.findByIdAndUpdate(id,req.body,(err,book) => {
    if(err) return next(err)
    res.redirect('/books/' + id)
  })
})

router.get('/:id/delete', (req,res,next) => {
  let id = req.params.id;
  Book.findByIdAndRemove(id,(err,book) => {
    if(err) return next(err)
    res.redirect('/books')
  })
})


//  Author id

// router.post('/:articleId/author', (req,res,next) => {
//   let articleId = req.params.id;
//   req.body.articleId = articleId;
//   Author.create(req.body, (err,author) => {
//     if(err) return next(err)
//     Book.findByIdAndUpdate(articleId, {$push : {authors : author.id}}, (err,articleId) => {
//       if(err) return next(err)
//       res.redirect('/books/' + articleId)
//     })
//   })
// })


module.exports = router;
