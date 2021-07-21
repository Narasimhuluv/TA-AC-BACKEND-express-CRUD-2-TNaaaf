let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let articleSchema = new Schema({
    title : String,
    author : String,
    description : String,
    likes : {type : Number, default : 0},
}, {timestamps : true})

let Article = mongoose.model('Article', articleSchema)
module.exports = Article;
