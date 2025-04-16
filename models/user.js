const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/miniproject")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password:String,
  email:String,
  password:String,
  posts:[{type: mongoose.Schema.Types.ObjectId,ref:"post"}],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
