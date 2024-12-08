import ApiError from "../helpers/apiError.js";
import Post from "../models/Post.js";
import User from "../models/User.js";
import * as userService from "../services/userService.js";
import * as tokenService from "../services/tokenService.js";

//создание поста
export const createPost = async (title, text, image, author) => {
  const post = new Post({
    title,
    text,
    image,
    author,
  });

  const user = await User.findOne({ _id: author });

  await post.save();

  await user.updateOne({ posts: [...user.posts, post._id] });

  return post;
};

//редактирование поста
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

//получение всех постов
export const getPosts = async (limit, skip) => {
  const posts = await Post.find()
    .skip(skip)
    .limit(limit)
    .populate("author", "login")
    .exec();

  return posts;
};

//получение одного поста по id
export const getPost = async (postId) => {
  const post = await Post.findOne({ _id: postId })
    .populate("author", "login")
    .populate("comments.author", "avatar login")
    .exec();

  return post;
};

//получить посты по id пользователя
export const getUserPosts = async (userId, limit, skip) => {
  const posts = await User.findOne({ _id: userId })

    .populate({
      path: "posts",
      skip: `${skip}`,
      limit: `${limit}`,

      populate: {
        path: "author",
        select: "login",
      },
    })
    .select("posts -_id");

  return posts;
};

//получить лайкнутые посты по id пользователя
export const getLiked = async (userId, limit, skip) => {
  const liked = await User.findOne({ _id: userId })

    .populate({
      path: "likedPosts",
      skip: `${skip}`,
      limit: `${limit}`,
      populate: {
        path: "author",
        select: "login",
      },
    })
    .select("likedPosts -_id");

  return liked;
};

//получить репосты пользователя по его id
export const getReposted = async (userId, limit, skip) => {
  const reposted = await User.findOne({ _id: userId })
    .populate({
      path: `repostedPosts`,

      populate: {
        path: "post",
        populate: {
          path: "author",
          select: "login",
        },
      },
    })
    .select("repostedPosts -_id");

  reposted.repostedPosts = reposted.repostedPosts.slice(skip, skip + limit);

  return reposted;
};

//лайк поста
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

//репост
export const repostPost = async (postId, token, text) => {
  if (!token) {
    throw ApiError.UnathorizedError();
  }

  const userData = await tokenService.validateAccessToken(token);

  if (!userData) {
    throw ApiError.UnathorizedError();
  }

  const user = await User.findOne({ _id: userData.id });

  const repostedPosts = user.repostedPosts;

  if (!repostedPosts.some((el) => el.hello === `${postId}`)) {
    const post = await Post.findOne({ _id: postId });

    await post.updateOne({
      reposts: (post.reposts += 1),
      repostedBy: [...post.repostedBy, user._id],
    });

    await user.updateOne({
      repostedPosts: [...repostedPosts, { post: postId, text }],
    });
  } else {
    const post = await Post.findOne({ _id: postId });

    await post.updateOne({
      reposts: (post.reposts -= 1),
      repostedBy: post.repostedBy.filter((item) => {
        item != user._id;
      }),
    });

    await user.updateOne({
      repostedPosts: user.repostedPosts.filter((item) => {
        item != post._id;
      }),
    });
  }

  return repostedPosts;
};

//комментарий поста

export const commentPost = async (userId, comment, postId) => {
  const post = await Post.findOne({ _id: postId });
  await post.updateOne({
    comments: [...post.comments, { author: userId, text: comment }],
  });

  const user = await User.findOne({ _id: userId });

  await user.updateOne({
    commentedPosts: [...user.commentedPosts, { post: postId, text: comment }],
  });
  return user.commentedPosts;
};

export const getComments = async (postId) => {
  const post = await Post.findOne({ _id: postId });

  const comments = post.comments;

  return comments;
};
