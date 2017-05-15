let mongoose = require('mongoose');
let bcrypt = require('bcryptjs');
//User Schema
let Schema = mongoose.Schema;
let UserSchema = new Schema({
    email: { type: String, index:{unique: true }},
    username: { type: String, index: true},
    password: { type: String },
    name:{type:String}
});
var User=module.exports = mongoose.model('User', UserSchema);

//Encryption
module.exports.createUser=(newUser, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                newUser.password = hash;
                
                newUser.save(callback);
            });
        });
}


module.exports.getUserByUsername = (username, callback) => {
    var query = { username: username };
    User.findOne(query, callback);
}
module.exports.userCheck = (newUser,callback) => {
    User.findOne({ "username": newUser.username},callback);
}
module.exports.emailCheck = (newUser, callback) => {
    User.findOne({ "email": newUser.email }, callback);
}

module.exports.getUserByEmail = (email, callback) => {
    var query = { email: email };
    User.findOne(query, callback);
}
module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
}
module.exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    })
}