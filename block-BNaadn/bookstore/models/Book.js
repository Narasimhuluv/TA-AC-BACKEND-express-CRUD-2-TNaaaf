let mongoose  = require('mongoose')
let Schema = mongoose.Schema;
let booksSchema = new Schema({
    title : String,
    summery : String,
    pages : Number,
    publication : String,
    coverImage : String,
    articleId : {type : Schema.Types.ObjectId, ref : "Author"}
},{timestamps : true})

let Book = mongoose.model('Book', booksSchema)
module.exports = Book;