var mongoose = require('mongoose');
//Blog Schema
var Schema = mongoose.Schema;
var blogSchema = new Schema({
    title: String,
    author: String,
    body: String,
    comments: [{ body: String,email:String,author:String, date: Date }],
    date: { type: Date, default: Date.now },
    tags: [{ tag: String }],
    meta: {
        votes: Number,
        favs: Number
    }
});
var Blog = module.exports = mongoose.model('Blog', blogSchema);

module.exports.createBlog = (newBlog,callback) => {

    newBlog.save(callback);
}
module.exports.getBlogsByAuthor = (author,callback) => {
    Blog.find({ "author":author }, callback);
}
module.exports.getBlogByTitle = (author,title, callback) => {
    Blog.findOne({ "author": author,"title":title }, callback);
}
module.exports.removeBlogByAuthor = (author,title,callback) => {
    Blog.findOneAndRemove({"author":author,"title":title});
}
module.exports.getBlogsByTags = (tags, callback) => {
    Blog.find({ "tags": tags });
}
