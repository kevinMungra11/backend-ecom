// import modules
const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');

// Set variable for mongoose.Schema
const Schema = mongoose.Schema;

// Schema for user
var userSchema = new Schema({
    name : {
        type : String,
        trim : true,
        required : true,
        maxlength : 32,
    },
    lastname : {
        type : String,
        trim : true,
        maxlength : 32,
    },
    email : {
        type : String,
        trim : true,
        unique : true,
        required : true
    },
    userinfo : {
        type : String,
        trim : true
    },
    encry_password : {
        type : String,
        required: true
    },
    salt : String,
    role : {
        type : Number,
        default : 0
    },
    purchases : {
        type : Array,
        default : []
    },

},
{ timestamps : true })

userSchema.virtual("password")
    .set(function (password) {
        this._password = password;
        this.salt = uuidv1();
        this.encry_password = this.securePassword(password);
    })
    .get(function() {
        return this._password;
    })

userSchema.methods = {
    authenticate : function(plainpassword) {
        return this.securePassword(plainpassword) === this.encry_password;
    },
    securePassword : function(plainpassword) {
        if(!plainpassword) return '';
        try {
            return crypto.createHmac('sha256', this.salt)
                   .update(plainpassword)
                   .digest('hex');
        } catch (error) {
            return '';
        }
    }
}


module.exports = mongoose.model('User',userSchema); 