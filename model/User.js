const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
mongoose.set('useFindAndModify', false);

// create the user schema
const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String, 
        required: true,
        trim: true, unique: true,
        match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    },
    phone:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    token:{
        type: String,
        required:false
    }
});

module.exports = User = mongoose.model('users',UserSchema);