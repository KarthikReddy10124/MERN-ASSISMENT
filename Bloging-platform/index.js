const express = require('express')
const mongoose = require('mongoose');
const Blog = require('./models/bloggingSchema');
const app = express()

app.use(express.json());


app.listen(4000, () => {
    console.log('server is running on port 4000')
});

app.get('/getBlogs', async (req,res) => {

    try {
        const blogs = await Blog.find({});
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/getblog/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        res.status(200).json(blog);

    }catch (error) {
        res.status(500).json({message: error.message});

    }
});


app.post('/addblog', async (req, res) => {
    try {
        const blog = await Blog.create(req.body);
        res.status(200).json(blog);
    } catch (error){
        res.status(500).json({message: error.message});
    }
});


// update a product
app.put('updateblog/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const blog = await Blog.findByIdAndUpdate(id, req.body);
        if (!blog) {
            return res.status(404).json({message: "Blog not found"});
        }

        const updateBlog = await Blog.findById(id);
        res.status(200).json(updateBlog);
    }   catch (error){
        res.status(500).json({message: error.message});
    }
});

// delete a product 

app.delete('deleteblog/:id', async (req,res)=>{
    try {
        const  {id} = req.params;
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
            return res.status(404).json({message: "Blog not found"});
        }
        res.status(200).json({message: "Blog deleted"});
    }
     catch (error) {
        res.status(500).json({message: error.message});
     }
});



mongoose.connect("mongodb+srv://2211cs010685:7u77wx6QETCAeZLl@backenddb.chtwd.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB")
.then(() => {
    console.log("Connected to database!");
    
})
.catch(() => {
    console.log("Connection failed!");

})