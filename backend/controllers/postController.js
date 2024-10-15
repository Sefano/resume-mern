import * as postService from "../services/postService.js";

export const createPost = async (req, res) => {
  try {
    const { title, text, image } = req.body;
    const author = req.user.id;

    const post = await postService.createPost(title, text, image, author);
    return res.json(post);
  } catch (error) {
    console.log(error);
  }
};

export const editPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, text, image } = req.body;

    const post = await postService.updatePost(title, text, image, postId);
    return res.json({ message: "Пост успешно обновлен" });
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await postService.getPosts();
    return res.json(posts);
  } catch (error) {
    console.log(error);
  }
};

export const getLiked = async (req, res) => {
  try {
    const userId = req.params.id;
    const posts = await postService.getLiked(userId);
    return res.json(posts);
  } catch (error) {
    console.log(error);
  }
};

export const getReposted = async (req, res) => {
  try {
    const userId = req.params.id;
    const posts = await postService.getReposted(userId);
    return res.json(posts);
  } catch (error) {
    console.log(error);
  }
};

export const getPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await postService.getPost(postId);
    return res.json(post);
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const postId = req.params.id;
    const likedPosts = await postService.likePost(postId, token);

    return res.json(likedPosts);
  } catch (error) {
    console.log(error);
  }
};

export const repostPost = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const postId = req.params.id;
    const text = req.body.text;
    const repostedPosts = await postService.repostPost(postId, token, text);

    return res.json(repostedPosts);
  } catch (error) {
    console.log(error);
  }
};
