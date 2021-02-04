import { types } from "../../src/types/types";

const initialState = {
  post: [],
  active: null,
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.postLoad:
      return {
        ...state,
        post: [...action.payload],
      };

    case types.postAddNew:
      return {
        ...state,
        post: [action.payload, ...state.post],
      };

    case types.postUpdated:
      return {
        ...state,
        post: state.post.map((post) =>
          post.id === action.payload.id ? action.payload.post : post
        ),
      };

    case types.postDelete:
      return {
        ...state,
        active: null,
        post: state.post.filter((post) => post.id !== action.payload),
      };

    case types.postLogoutCleaning:
      return {
        ...state,
        active: null,
        post: [],
      };

    default:
      return state;
  }
};
