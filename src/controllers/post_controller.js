import Post from '../models/post_model';

export const createPost = async (req, res) => {
  // await creating a post
  // return post
  const post = new Post();
  console.log('Request body ', req.user.username);
  post.author = req.user;
  post.title = req.body.title;
  post.tags = req.body.tags;
  post.content = req.body.content;
  post.actors = req.body.actors;
  post.rating = req.body.rating;
  post.coverUrl = req.body.coverUrl;
  try {
    const savedpost = await post.save();
    res.json(savedpost);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getPosts = async (req, res) => {
  // await finding posts
  // return posts
  console.log('in GET posts');
  try {
    console.log('in try GET posts');
    const posts = await Post.find({}).populate('author');
    // source: https://www.codegrepper.com/code-examples/javascript/react+sort+by+date
    // sort by time function
    console.log('before sort');
    console.log(posts);
    posts.sort((postA, postB) => {
      return (postB.createdAt - postA.createdAt);
    });
    console.log('after sort');
    console.log(posts);
    res.json(posts);
  } catch (error) {
    console.log('in error');
    console.log(error);
    res.status(500).json({ error });
  }
};

export const getPost = async (req, res) => {
  // await finding one post
  // return post
  try {
    const post = await Post.findById(req.params.id).populate('author');
    res.json(post);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deletePost = async (req, res) => {
  // await deleting a post
  // return confirmation
  console.log('in delete post');
  try {
    await Post.findByIdAndRemove(req.params.id);
    res.json('Post successfully deleted! ');
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updatePost = async (req, res) => {
  // await updating a post by id
  // return *updated* post
  console.log('in updatepost');
  try {
    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
    console.log('this is');
    console.log(req.body);
  } catch (error) {
    res.status(500).json({ error });
  }
};
