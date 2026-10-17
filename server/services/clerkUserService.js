const User = require("../models/User.js");

const syncClerkUser = async (userData) => {
  try {
    const {
      id,
      username,
      email_addresses,
      primary_email_address_id,
      image_url,
    } = userData;

    const primaryEmail = email_addresses?.find(
      (email) => email.id === primary_email_address_id,
    );

    const email = primaryEmail ? primaryEmail.email_address : null;

    const getUser = await User.findOneAndUpdate(
      { clerkUserId: id },
      {
        $set: {
          username: username,
          email: email,
          avatarUrl: image_url,
        },
      },
      { upsert: true, new: true },
    );

    return getUser;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deleteUser =async (userId)=>{
    if(!userId){
        throw new Error("User ID is required");
    }
    try{
        const deletedUser= await User.findOneAndDelete({clerkUserId:userId});
        if(deletedUser===null){
            return null;
        }
        return deletedUser;
    }catch(err){
        console.log(err);
        throw err;
    }
}

module.exports = { syncClerkUser, deleteUser };
