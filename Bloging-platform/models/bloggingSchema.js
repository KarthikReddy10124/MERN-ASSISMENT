const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Enter the title of the blog"],
  },
  content: {
    type: String,
    required: [true, "Enter the content of the blog"],
  },
  author: {
    type: String,
    required: [true, "Enter the author's name"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    enum: ["Technology", "Health", "Lifestyle", "Education", "Travel", "Food", "Business"],
    required: [true, "Select a category"],
  },
  likes: {
    type: Number,
    default: 0, 
  }
});

const Blog = mongoose.model("blogs", blogSchema);
module.exports = Blog;
