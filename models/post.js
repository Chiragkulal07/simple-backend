const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/miniproject")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const postSchema = new mongoose.Schema({
  user:{type: mongoose.Schema.Types.ObjectId,ref:"user"},
  content:String,
  likes:[{
    type :mongoose.Schema.Types.ObjectId,ref:"user"
  }]
});

const post = mongoose.model("post", postSchema);

module.exports = post;
