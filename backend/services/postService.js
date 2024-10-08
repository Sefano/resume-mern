import ApiError from "../helpers/apiError.js";
import Post from "../models/Post.js";
import User from "../models/User.js";
import * as userService from "../services/userService.js";
import * as tokenService from "../services/tokenService.js";

export const createPost = async (title, text, image, author) => {
  const post = new Post({
    title,
    text,
    image,
    author,
  });

  await post.save();

  return post;
};

export const updatePost = async (title, text, image, postId) => {
  // const post = await Post.findOne({ _id: postId });
  // if (!post) {
  //   throw new ApiError.BadRequest("Не удалось найти пост");
  // }
  // const updatedPost = await post.updateOne({
  //   title,
  //   text,
  //   image,
  // });

  const post = await Post.findOneAndUpdate(
    { _id: postId },
    {
      title,
      text,
      image,
    }
  );

  await post.save();

  return post;
};

export const getPosts = async () => {
  const posts = await Post.find().populate("author", "login").exec();

  return posts;
};

export const getPost = async (postId) => {
  const post = await Post.findOne({ _id: postId })
    .populate("author", "login")
    .exec();

  return post;
};

export const likePost = async (postId, token) => {
  if (!token) {
    throw ApiError.UnathorizedError();
  }

  const userData = await tokenService.validateAccessToken(token);

  if (!userData) {
    throw ApiError.UnathorizedError();
  }

  const user = await User.findOne({ _id: userData.id });

  const likedPosts = user.likedPosts;

  if (!likedPosts.includes(`${postId}`)) {
    const post = await Post.findOne({ _id: postId });

    await post.updateOne({
      likes: (post.likes += 1),
      likedBy: [...post.likedBy, user._id],
    });

    await user.updateOne({ likedPosts: [...likedPosts, post._id] });
  } else {
    const post = await Post.findOne({ _id: postId });

    await post.updateOne({
      likes: (post.likes -= 1),
      likedBy: post.likedBy.filter((item) => {
        item != user._id;
      }),
    });

    await user.updateOne({
      likedPosts: user.likedPosts.filter((item) => {
        item != post._id;
      }),
    });
  }

  return likedPosts;
};
