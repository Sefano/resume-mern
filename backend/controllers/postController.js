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
