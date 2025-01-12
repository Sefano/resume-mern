const ADD_COMMENT = "ADD_COMMENT";
const GET_COMMENTS = "GET_COMMENTS";

const defaultState = {
  comments: [],
};

export const commentsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: [...action.payload],
      };

    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };

    default:
      return state;
  }
};

export const addComment = (comment) => ({
  type: ADD_COMMENT,
  payload: comment,
});

export const getComments = (comments) => ({
  type: GET_COMMENTS,
  payload: comments,
});
