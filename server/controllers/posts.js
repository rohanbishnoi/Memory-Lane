const mongoose = require('mongoose');
const PostMessage = require('../models/postMessage');


// module.exports.getPosts = (req, res) => {
//     res.send('This Works');
// };
// // OR For multiple export in node js


exports.getPosts = async (req, res) => {
    try {
        const postMessage = await PostMessage.find();
        console.log('GET');

        res.status(200).json(postMessage);

    } catch (error) {
        res.status(404).json({ message: error.message });

    }
};

exports.createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post);

    try {
        await newPost.save();

        console.log('CREATED');

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

exports.updatePost = async (req, res) => {
    const { id } = req.params;

    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    console.log('UPDATED');

    res.json(updatedPost);
};

exports.deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);


    await PostMessage.findByIdAndRemove(id);

    console.log('DELETE');

    res.json({ message: 'Post deleted successfully' });
}

exports.likePost = async (req, res) => {
    const { id } = req.params;



    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });

    console.log('LIKE ++');

    res.json(updatedPost);
};



