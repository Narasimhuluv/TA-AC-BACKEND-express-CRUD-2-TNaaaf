let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let authorSchema = new Schema({
    name : String,
    email : String,
    country : String,
    authorId : {type : Schema.Types.ObjectId, ref : 'Book'}
},{timestamps : true})

let Author = mongoose.model('Author', authorSchema)
module.exports = Author;