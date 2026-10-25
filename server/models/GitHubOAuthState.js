const mongoose= require('mongoose');

const GitHubOAuthStateSchema= new mongoose.Schema({
    state: {type: String, required: true, unique: true},
    clerkUserId: {type: String, required: true},
    expiresAt: {type: Date, required: true}
});
GitHubOAuthStateSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports=mongoose.model('GitHubOAuthState', GitHubOAuthStateSchema);