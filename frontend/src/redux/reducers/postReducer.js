const GET_POSTS = "GET_POSTS";
const ADD_POST = "ADD_POST";
const SINGLE_POST = "SINGLE_POST";
const CLEAR_POSTS = "CLEAR_POSTS";

const defaultState = {
  posts: [],
};

export const postReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
      };
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case SINGLE_POST:
      return {
        ...state,
        singlePost: action.payload,
      };
    case CLEAR_POSTS:
      return {
        ...state,
        posts: [],
      };

    default:
      return state;
  }
};

export const setPosts = (posts) => ({ type: GET_POSTS, payload: posts });
export const addPost = (post) => ({ type: ADD_POST, payload: post });
export const singlePost = (post) => ({ type: SINGLE_POST, payload: post });
export const clearPosts = () => ({ type: CLEAR_POSTS });
