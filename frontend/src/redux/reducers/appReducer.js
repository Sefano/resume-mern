const SHOW_MODAL = "SHOW_MODAL";
const HIDE_MODAL = "HIDE_MODAL";

const defaultState = {
  modal: false,
  contentModal: {},
};

export const appReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return { ...state, modal: true, contentModal: action.payload };
    case HIDE_MODAL:
      return { ...state, modal: false };
    default:
      return state;
  }
};

export const showModal = (post) => ({ type: SHOW_MODAL, payload: post });
export const hideModal = () => ({ type: HIDE_MODAL });
