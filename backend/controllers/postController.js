import * as postService from "../services/postService.js";

//создание поста
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

//редактирование поста
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

//получение всех постов
export const getPosts = async (req, res) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    const posts = await postService.getPosts(limit, skip);
    return res.json(posts);
  } catch (error) {
    console.log(error);
  }
};

//получить  посты по id пользователя
export const getUserPosts = async (req, res) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    const userId = req.params.id;
    const posts = await postService.getUserPosts(userId, limit, skip);
    if (posts) {
      return res.json(posts.posts);
    }
    return res.json(posts);
  } catch (error) {
    console.log(error);
  }
};

//получить лайкнутые посты по id пользователя
export const getLiked = async (req, res) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    const userId = req.params.id;
    const liked = await postService.getLiked(userId, limit, skip);

    if (liked) {
      return res.json(liked.likedPosts);
    }
    return res.json(liked);
  } catch (error) {
    console.log(error);
  }
};

//получить репосты пользователя по его id
export const getReposted = async (req, res) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    const userId = req.params.id;
    const reposted = await postService.getReposted(userId, limit, skip);
    if (reposted) {
      return res.json(reposted.repostedPosts);
    }
    return res.json(reposted);
  } catch (error) {
    console.log(error);
  }
};

//получение одного поста по id
export const getPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await postService.getPost(postId);
    return res.json(post);
  } catch (error) {
    console.log(error);
  }
};

//лайк поста
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

//репост
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
