import { types } from "../types/types";

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.login:
      return {
        token: action.payload.token,
        name: action.payload.name,
        image: action.payload.image,
      };
    case types.logout:
      return {};
    default:
      return state;
  }
};
