const mongoose= require('mongoose');

const userSchema= new mongoose.Schema({
    clerkUserId: {type: String, required: true, unique: true, immutable: true},
    githubUserId: {type: Number, default: null},
    username: {type: String},
    email: {type: String},
    avatarUrl: {type: String},
    githubInstallationId: {type: Number, default: null}
},{
    timestamps: true
})

module.exports=mongoose.model('User', userSchema);