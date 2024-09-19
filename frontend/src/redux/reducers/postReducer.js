const GET_POSTS = "GET_POSTS";
const ADD_POST = "ADD_POST";

const defaultState = {
  posts: [],
};

export const postReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };

    default:
      return state;
  }
};

export const setPosts = (posts) => ({ type: GET_POSTS, payload: posts });
export const addPost = (post) => ({ type: ADD_POST, payload: post });
