import ApiError from "../helpers/apiError.js";
import Post from "../models/Post.js";

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
