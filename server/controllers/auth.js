const User = require('../models/user');

exports.createOrUpdateUser = async (req, res) => {

  const { name, picture, email } = req.user;
  const user = await User.findOneAndUpdate({ email: email }, { name, picture }, { new: true });

  if (user) {
    res.json(user);
    console.log("user updated", user);
  }
  else {
    const newUser = await new User({
      name, picture, email
    }).save();
    res.json(newUser);
    console.log("user added", newUser);
  }

}
exports.currentUser = async (req, res) => {
  const { email } = req.user;

  await User.findOne({ email: email }).exec((err,user)=>{
    if (err) throw err;
    res.json(user);
  });


}