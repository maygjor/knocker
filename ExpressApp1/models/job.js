//User Schema
let assert = require('assert');
let mongoose = require('mongoose');
let db = mongoose.connection;
let Schema = mongoose.Schema;
let JobSchema = new Schema({
    email: { type: String, index: { unique: true } },
    company: { type: String, index: true },
    category: {type:String},
    title: { type: String },
    description: { type: String },
    date: { type: String, default:Date.now }
},{ collection: 'jobs' });
var Job = module.exports =mongoose.model('Job', JobSchema);
module.exports.getJobsByCompany = (company, callback) => {
    Job.find({ "company": company }, callback);
}
module.exports.getJobsByTitle = (title, callback) => {
    Job.find({ "title": title }, callback);
}
module.exports.getJob = (company, title, callback) => {
    Job.findOne({ "company": company, "title": title },callback);
}
module.exports.removeJobByCompany = (company, title, callback) => {
    Job.findOneAndRemove({ "company": company, "title": title },callback);
}
module.exports.getJobsByCategory = (category, callback) => {
    Job.find({ "category": category },callback);
}
module.exports.getJobs=(callback)=> {
    callback=Job.find();
}

