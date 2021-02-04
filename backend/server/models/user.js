const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.set('useCreateIndex', true, 'useFindAndModify', false);

const uniqueValidator = require('mongoose-unique-validator');



const userSchema = new Schema({
    name: { type: String, required: [true, 'The name is necesary'] },
    email: { type: String, required: [true, 'The Email is necesary'] },
    password: { type: String, required: [true, 'The password is necesary'] },
    imageUrl: { type: String, required: false },
    public_id: { type: String },
    created_at: { type: Date, default: Date.now(), required: true }
});

userSchema.methods.toJSON= function(){
    let user= this;
    let userObject= user.toObject();
    delete userObject.password;

    return userObject;
}

userSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' });
module.exports= mongoose.model('User',userSchema);
